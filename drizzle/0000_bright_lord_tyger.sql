CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nameUser` text NOT NULL,
	`passUSer` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL,
	`adminUser` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);