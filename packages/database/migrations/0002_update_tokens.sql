PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_verification_token` (
	`identifier` text NOT NULL,
	`token` text PRIMARY KEY NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_verification_token`("identifier", "token", "expires") SELECT "identifier", "token", "expires" FROM `verification_token`;--> statement-breakpoint
DROP TABLE `verification_token`;--> statement-breakpoint
ALTER TABLE `__new_verification_token` RENAME TO `verification_token`;--> statement-breakpoint
PRAGMA foreign_keys=ON;