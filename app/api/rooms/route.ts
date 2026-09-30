import { eq, lt } from "drizzle-orm";
import { getDb } from "@/db";
import { answers, players, rooms } from "@/db/schema";
import { cleanNickname, json } from "@/lib/multi-server";
import { encodeRoomSeed, isMultiMode } from "@/lib/multi-bank";

const ROOM_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function roomCode() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return [...bytes].map(value => ROOM_ALPHABET[value % ROOM_ALPHABET.length]).join("");
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { nickname?: unknown;mode?:unknown };
    const nickname = cleanNickname(body.nickname);
    if (!nickname) return json({ error:"Choisis un pseudo de 2 à 16 caractères." },400);
    const mode = isMultiMode(body.mode) ? body.mode : "mega";

    const db = getDb();
    const expiry = Date.now() - 24 * 60 * 60 * 1000;
    const expired = await db.select({ code:rooms.code }).from(rooms).where(lt(rooms.createdAt,expiry)).limit(50);
    for (const item of expired) {
      await db.delete(answers).where(eq(answers.roomCode,item.code));
      await db.delete(players).where(eq(players.roomCode,item.code));
      await db.delete(rooms).where(eq(rooms.code,item.code));
    }

    let created: typeof rooms.$inferSelect | undefined;
    for (let attempt = 0; attempt < 6 && !created; attempt += 1) {
      const code = roomCode();
      const [room] = await db.insert(rooms).values({
        code,
        hostToken:crypto.randomUUID(),
        status:"lobby",
        seed:encodeRoomSeed(mode,0),
        questionCount:20,
        createdAt:Date.now(),
      }).onConflictDoNothing().returning();
      created = room;
    }
    if (!created) return json({ error:"Impossible de créer le salon. Réessaie." },503);

    const token = crypto.randomUUID();
    const playerId = crypto.randomUUID();
    const now = Date.now();
    await db.insert(players).values({
      id:playerId,
      roomCode:created.code,
      token,
      nickname,
      isHost:true,
      avatarSeed:Math.floor(Math.random() * 8),
      joinedAt:now,
      lastSeenAt:now,
    });

    return json({ roomCode:created.code,playerToken:token,playerId },201);
  } catch (error) {
    console.error("room create failed",error);
    return json({ error:"Le serveur multi est momentanément indisponible." },500);
  }
}
