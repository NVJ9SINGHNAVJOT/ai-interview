ALTER TABLE "user" RENAME COLUMN "mail_id" TO "email_id";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_mail_id_unique";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_id_unique" UNIQUE("email_id");