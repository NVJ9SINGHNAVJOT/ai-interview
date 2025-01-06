ALTER TABLE "mcq_result" ALTER COLUMN "answers" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "mcq_result" ADD COLUMN "checked" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "interview_result" ADD CONSTRAINT "interview_result_interview_id_user_id_unique" UNIQUE("interview_id","user_id");