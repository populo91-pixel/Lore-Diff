import { and, asc, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { answers, players, rooms } from "@/db/schema";
import { ANSWER_MS, MAX_PLAYERS, bearerToken, cleanNickname, json, roomTimeline } from "@/lib/multi-server";
import { decodeRoomMode, encodeRoomSeed, questionCountForMode } from "@/lib/multi-bank";

type Context = { params: Promise<{ code:string }> };

async function getRoomAndPlayer(code: string, token: string) {
  const db = getDb();
  const [room] = await db.select().from(rooms).where(eq(rooms.code,code)).limit(1);
  if (!room) return { db,room:null,player:null };
  const [player] = token ? await db.select().from(players).where(and(eq(players.roomCode,code),eq(players.token,token))).limit(1) : [];
  return { db,room,player:player || null };
}

export async function GET(request: Request, context: Context) {
  try {
    const { code:rawCode } = await context.params;
    const code = rawCode.toUpperCase();
    const token = bearerToken(request);
    const { db,room,player } = await getRoomAndPlayer(code,token);
    if (!room) return json({ error:"Salon introuvable ou expiré." },404);
    if (!player) return json({ error:"Tu dois rejoindre ce salon." },401);

    const now = Date.now();
    await db.update(players).set({ lastSeenAt:now }).where(eq(players.id,player.id));
    const timeline = roomTimeline(room,now);
    if (timeline.phase === "finished" && room.status !== "finished") {
      await db.update(rooms).set({ status:"finished" }).where(eq(rooms.code,code));
    }

    const roster = await db.select().from(players).where(eq(players.roomCode,code)).orderBy(desc(players.score),asc(players.joinedAt));
    const roundAnswers = timeline.round >= 0
      ? await db.select().from(answers).where(and(eq(answers.roomCode,code),eq(answers.round,timeline.round)))
      : [];
    const myAnswer = roundAnswers.find(answer => answer.playerId === player.id);
    const question = timeline.question ? {
      id:timeline.question.id,
      type:timeline.question.type,
      era:timeline.question.era,
      universe:timeline.question.universe || "wow",
      prompt:timeline.question.prompt,
      options:timeline.question.options,
      audio:timeline.question.audio || null,
      image:timeline.question.image || null,
      imageMode:timeline.question.imageMode || null,
      ...(timeline.phase === "reveal" ? { correctIndex:timeline.question.correctIndex,fact:timeline.question.fact } : {}),
    } : null;

    return json({
      room:{ code:room.code,status:timeline.phase === "finished" ? "finished" : room.status,questionCount:room.questionCount,mode:decodeRoomMode(room.seed) },
      me:{ id:player.id,nickname:player.nickname,isHost:player.isHost },
      players:roster.map(item => ({
        id:item.id,nickname:item.nickname,isHost:item.isHost,score:item.score,correctCount:item.correctCount,
        avatarSeed:item.avatarSeed,connected:now - item.lastSeenAt < 8_000,
      })),
      phase:timeline.phase,
      round:timeline.round,
      remainingMs:timeline.remainingMs,
      answeredCount:roundAnswers.length,
      selectedChoice:myAnswer?.choice ?? null,
      question,
      serverNow:now,
    });
  } catch (error) {
    console.error("room snapshot failed",error);
    return json({ error:"Impossible de synchroniser la partie." },500);
  }
}

export async function POST(request: Request, context: Context) {
  try {
    const { code:rawCode } = await context.params;
    const code = rawCode.toUpperCase();
    const body = await request.json() as { action?:string;nickname?:unknown;questionCount?:number;round?:number;choice?:number };
    const token = bearerToken(request);
    const { db,room,player } = await getRoomAndPlayer(code,token);
    if (!room) return json({ error:"Salon introuvable ou expiré." },404);

    if (body.action === "join") {
      if (room.status !== "lobby") return json({ error:"La partie a déjà commencé." },409);
      const nickname = cleanNickname(body.nickname);
      if (!nickname) return json({ error:"Choisis un pseudo de 2 à 16 caractères." },400);
      const roster = await db.select().from(players).where(eq(players.roomCode,code));
      if (roster.length >= MAX_PLAYERS) return json({ error:"Ce salon est complet." },409);
      if (roster.some(item => item.nickname.toLocaleLowerCase("fr") === nickname.toLocaleLowerCase("fr"))) {
        return json({ error:"Ce pseudo est déjà pris dans le salon." },409);
      }
      const playerToken = crypto.randomUUID();
      const playerId = crypto.randomUUID();
      const now = Date.now();
      await db.insert(players).values({
        id:playerId,roomCode:code,token:playerToken,nickname,isHost:false,
        avatarSeed:Math.floor(Math.random() * 8),joinedAt:now,lastSeenAt:now,
      });
      return json({ roomCode:code,playerToken,playerId },201);
    }

    if (!player) return json({ error:"Session joueur invalide." },401);

    if (body.action === "start") {
      if (!player.isHost) return json({ error:"Seul l’hôte peut lancer la partie." },403);
      const count = questionCountForMode(decodeRoomMode(room.seed));
      const roster = await db.select({ id:players.id }).from(players).where(eq(players.roomCode,code));
      if (roster.length < 2) return json({ error:"Il faut au moins deux joueurs." },409);
      await db.delete(answers).where(eq(answers.roomCode,code));
      await db.update(players).set({ score:0,correctCount:0 }).where(eq(players.roomCode,code));
      await db.update(rooms).set({
        status:"playing",questionCount:count,seed:encodeRoomSeed(decodeRoomMode(room.seed),crypto.getRandomValues(new Uint32Array(1))[0]),startedAt:Date.now() + 3_000,
      }).where(eq(rooms.code,code));
      return json({ ok:true });
    }

    if (body.action === "answer") {
      const now = Date.now();
      const timeline = roomTimeline(room,now);
      if (timeline.phase !== "answer" || !timeline.question) return json({ error:"Le temps de réponse est terminé." },409);
      if (body.round !== timeline.round || !Number.isInteger(body.choice) || body.choice! < 0 || body.choice! > 3) {
        return json({ error:"Réponse invalide." },400);
      }
      const isCorrect = body.choice === timeline.question.correctIndex;
      const speedBonus = Math.max(0,Math.ceil((timeline.remainingMs / ANSWER_MS) * 500));
      const points = isCorrect ? 1_000 + speedBonus : 0;
      const inserted = await db.insert(answers).values({
        roomCode:code,playerId:player.id,round:timeline.round,choice:body.choice!,isCorrect,points,answeredAt:now,
      }).onConflictDoNothing().returning({ id:answers.id });
      if (!inserted.length) return json({ error:"Réponse déjà verrouillée." },409);
      await db.update(players).set({
        score:sql`${players.score} + ${points}`,
        correctCount:sql`${players.correctCount} + ${isCorrect ? 1 : 0}`,
      }).where(eq(players.id,player.id));
      return json({ ok:true,points });
    }

    return json({ error:"Action inconnue." },400);
  } catch (error) {
    console.error("room action failed",error);
    return json({ error:"Le serveur multi a rencontré une erreur." },500);
  }
}
