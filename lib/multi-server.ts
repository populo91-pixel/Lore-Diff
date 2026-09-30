import { decodeRoomMode, questionsForRoom } from "./multi-bank";
import type { rooms } from "@/db/schema";

export const START_DELAY_MS = 3_000;
export const ANSWER_MS = 18_000;
export const REVEAL_MS = 6_000;
export const ROUND_MS = ANSWER_MS + REVEAL_MS;
export const MAX_PLAYERS = 8;

type Room = typeof rooms.$inferSelect;

export function roomTimeline(room: Room, now = Date.now()) {
  if (room.status === "lobby" || !room.startedAt) {
    return { phase:"lobby" as const, round:-1, remainingMs:0, question:null };
  }

  if (now < room.startedAt) {
    return { phase:"countdown" as const, round:0, remainingMs:room.startedAt - now, question:null };
  }

  const elapsed = now - room.startedAt;
  const round = Math.floor(elapsed / ROUND_MS);
  const roomQuestions = questionsForRoom(room.seed, room.questionCount, decodeRoomMode(room.seed));
  if (round >= roomQuestions.length) {
    return { phase:"finished" as const, round:roomQuestions.length, remainingMs:0, question:null };
  }

  const roundElapsed = elapsed % ROUND_MS;
  const phase = roundElapsed < ANSWER_MS ? "answer" as const : "reveal" as const;
  const remainingMs = phase === "answer" ? ANSWER_MS - roundElapsed : ROUND_MS - roundElapsed;
  return { phase,round,remainingMs,question:roomQuestions[round] };
}

export function cleanNickname(value: unknown) {
  if (typeof value !== "string") return null;
  const nickname = value.trim().replace(/\s+/g," ");
  return nickname.length >= 2 && nickname.length <= 16 ? nickname : null;
}

export function bearerToken(request: Request) {
  const header = request.headers.get("authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}

export function json(data: unknown, status = 200) {
  return Response.json(data, { status,headers:{ "Cache-Control":"no-store" } });
}
