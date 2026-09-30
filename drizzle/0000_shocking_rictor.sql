CREATE TABLE `answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`room_code` text NOT NULL,
	`player_id` text NOT NULL,
	`round` integer NOT NULL,
	`choice` integer NOT NULL,
	`is_correct` integer NOT NULL,
	`points` integer DEFAULT 0 NOT NULL,
	`answered_at` integer NOT NULL,
	FOREIGN KEY (`room_code`) REFERENCES `rooms`(`code`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_answers_player_round` ON `answers` (`room_code`,`player_id`,`round`);--> statement-breakpoint
CREATE INDEX `idx_answers_room_round` ON `answers` (`room_code`,`round`);--> statement-breakpoint
CREATE TABLE `players` (
	`id` text PRIMARY KEY NOT NULL,
	`room_code` text NOT NULL,
	`token` text NOT NULL,
	`nickname` text NOT NULL,
	`is_host` integer DEFAULT false NOT NULL,
	`score` integer DEFAULT 0 NOT NULL,
	`correct_count` integer DEFAULT 0 NOT NULL,
	`avatar_seed` integer DEFAULT 0 NOT NULL,
	`joined_at` integer NOT NULL,
	`last_seen_at` integer NOT NULL,
	FOREIGN KEY (`room_code`) REFERENCES `rooms`(`code`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `players_token_unique` ON `players` (`token`);--> statement-breakpoint
CREATE INDEX `idx_players_room_code` ON `players` (`room_code`);--> statement-breakpoint
CREATE TABLE `rooms` (
	`code` text PRIMARY KEY NOT NULL,
	`host_token` text NOT NULL,
	`status` text DEFAULT 'lobby' NOT NULL,
	`seed` integer DEFAULT 0 NOT NULL,
	`question_count` integer DEFAULT 10 NOT NULL,
	`started_at` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rooms_host_token_unique` ON `rooms` (`host_token`);--> statement-breakpoint
PRAGMA optimize;
