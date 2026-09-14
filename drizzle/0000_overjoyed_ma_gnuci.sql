CREATE TABLE `resources` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`verified_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`resource_id` text,
	`data` text NOT NULL,
	`contact_email` text NOT NULL,
	`submitted_at` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL
);
