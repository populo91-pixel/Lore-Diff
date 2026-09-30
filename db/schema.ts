import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const dailyRuns = sqliteTable("daily_runs", {
  id: text("id").primaryKey(),
  owner: text("owner").notNull(),
  day: text("day").notNull(),
  rankedKey: text("ranked_key").unique(),
  state: text("state").notNull(),
  version: integer("version").notNull().default(0),
  score: integer("score").notNull().default(0),
  finished: integer("finished").notNull().default(0),
  createdAt: integer("created_at").notNull(),
}, table => [index("idx_daily_owner_day").on(table.owner, table.day), index("idx_daily_day_score").on(table.day, table.finished, table.score)]);

export const diffRuns = sqliteTable("diff_runs", {
  id: text("id").primaryKey(),
  owner: text("owner").notNull(),
  state: text("state").notNull(),
  version: integer("version").notNull().default(0),
  finished: integer("finished").notNull().default(0),
  createdAt: integer("created_at").notNull(),
}, table => [index("idx_diff_owner_created").on(table.owner, table.createdAt)]);

export const rooms = sqliteTable("rooms", {
  code: text("code").primaryKey(),
  hostToken: text("host_token").notNull().unique(),
  status: text("status").notNull().default("lobby"),
  seed: integer("seed").notNull().default(0),
  questionCount: integer("question_count").notNull().default(10),
  startedAt: integer("started_at"),
  createdAt: integer("created_at").notNull(),
});

export const players = sqliteTable("players", {
  id: text("id").primaryKey(),
  roomCode: text("room_code").notNull().references(() => rooms.code, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  nickname: text("nickname").notNull(),
  isHost: integer("is_host", { mode: "boolean" }).notNull().default(false),
  score: integer("score").notNull().default(0),
  correctCount: integer("correct_count").notNull().default(0),
  avatarSeed: integer("avatar_seed").notNull().default(0),
  joinedAt: integer("joined_at").notNull(),
  lastSeenAt: integer("last_seen_at").notNull(),
}, table => [index("idx_players_room_code").on(table.roomCode)]);

export const answers = sqliteTable("answers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomCode: text("room_code").notNull().references(() => rooms.code, { onDelete: "cascade" }),
  playerId: text("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
  round: integer("round").notNull(),
  choice: integer("choice").notNull(),
  isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
  points: integer("points").notNull().default(0),
  answeredAt: integer("answered_at").notNull(),
}, table => [
  uniqueIndex("idx_answers_player_round").on(table.roomCode, table.playerId, table.round),
  index("idx_answers_room_round").on(table.roomCode, table.round),
]);
