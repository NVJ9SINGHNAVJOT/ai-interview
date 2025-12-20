CREATE TABLE IF NOT EXISTS "interview_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"interview_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"checked" boolean DEFAULT false NOT NULL,
	"job_description" text NOT NULL,
	"user_answer_1" text,
	"review_1" text,
	"rating_1" integer,
	"user_answer_2" text,
	"review_2" text,
	"rating_2" integer,
	"user_answer_3" text,
	"review_3" text,
	"rating_3" integer,
	"user_answer_4" text,
	"review_4" text,
	"rating_4" integer,
	"user_answer_5" text,
	"review_5" text,
	"rating_5" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "interview_result_interview_id_user_id_unique" UNIQUE("interview_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_role" varchar(255) NOT NULL,
	"year_of_exp" integer NOT NULL,
	"question_1" text NOT NULL,
	"answer_1" text NOT NULL,
	"question_2" text NOT NULL,
	"answer_2" text NOT NULL,
	"question_3" text NOT NULL,
	"answer_3" text NOT NULL,
	"question_4" text NOT NULL,
	"answer_4" text NOT NULL,
	"question_5" text NOT NULL,
	"answer_5" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mcq_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"checked" boolean DEFAULT false NOT NULL,
	"answers" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mcqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"option_1" text NOT NULL,
	"option_2" text NOT NULL,
	"option_3" text NOT NULL,
	"option_4" text NOT NULL,
	"reason" text NOT NULL,
	"answer" integer NOT NULL,
	"job_role" varchar(255) NOT NULL,
	"year_of_exp" integer NOT NULL,
	"tags" varchar(255)[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "querys" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar NOT NULL,
	"email_id" varchar NOT NULL,
	"query_text" varchar(500) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"image_url" varchar(255),
	"email_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_id_unique" UNIQUE("email_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interview_results" ADD CONSTRAINT "interview_results_interview_id_interviews_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."interviews"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interview_results" ADD CONSTRAINT "interview_results_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mcq_results" ADD CONSTRAINT "mcq_results_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
