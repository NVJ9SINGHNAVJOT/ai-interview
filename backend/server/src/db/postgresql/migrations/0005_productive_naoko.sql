ALTER TABLE "interview" RENAME COLUMN "job_position" TO "job_role";--> statement-breakpoint
ALTER TABLE "interview" RENAME COLUMN "question1" TO "question_1";--> statement-breakpoint
ALTER TABLE "interview" RENAME COLUMN "question2" TO "question_2";--> statement-breakpoint
ALTER TABLE "interview" RENAME COLUMN "question3" TO "question_3";--> statement-breakpoint
ALTER TABLE "interview" RENAME COLUMN "question4" TO "question_4";--> statement-breakpoint
ALTER TABLE "interview" RENAME COLUMN "question5" TO "question_5";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "user_answer1" TO "user_answer_1";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "review1" TO "review_1";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "rating1" TO "rating_1";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "user_answer2" TO "user_answer_2";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "review2" TO "review_2";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "rating2" TO "rating_2";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "user_answer3" TO "user_answer_3";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "review3" TO "review_3";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "rating3" TO "rating_3";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "user_answer4" TO "user_answer_4";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "review4" TO "review_4";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "rating4" TO "rating_4";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "user_answer5" TO "user_answer_5";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "review5" TO "review_5";--> statement-breakpoint
ALTER TABLE "interview_result" RENAME COLUMN "rating5" TO "rating_5";--> statement-breakpoint
ALTER TABLE "mcq_result" ALTER COLUMN "answers" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "interview" ADD COLUMN "answer_1" text NOT NULL;--> statement-breakpoint
ALTER TABLE "interview" ADD COLUMN "answer_2" text NOT NULL;--> statement-breakpoint
ALTER TABLE "interview" ADD COLUMN "answer_3" text NOT NULL;--> statement-breakpoint
ALTER TABLE "interview" ADD COLUMN "answer_4" text NOT NULL;--> statement-breakpoint
ALTER TABLE "interview" ADD COLUMN "answer_5" text NOT NULL;