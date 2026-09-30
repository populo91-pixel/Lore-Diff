CREATE TABLE `daily_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`day` text NOT NULL,
	`ranked_key` text,
	`state` text NOT NULL,
	`version` integer DEFAULT 0 NOT NULL,
	`score` integer DEFAULT 0 NOT NULL,
	`finished` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `daily_runs_ranked_key_unique` ON `daily_runs` (`ranked_key`);--> statement-breakpoint
CREATE INDEX `idx_daily_owner_day` ON `daily_runs` (`owner`,`day`);--> statement-breakpoint
CREATE INDEX `idx_daily_day_score` ON `daily_runs` (`day`,`finished`,`score`);