CREATE TABLE IF NOT EXISTS "interview" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_position" varchar(255) NOT NULL,
	"year_of_exp" integer NOT NULL,
	"question1" text NOT NULL,
	"question2" text NOT NULL,
	"question3" text NOT NULL,
	"question4" text NOT NULL,
	"question5" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interview_result" (
	"id" serial PRIMARY KEY NOT NULL,
	"interview_id" integer NOT NULL,
	"checked" boolean DEFAULT false NOT NULL,
	"user_id" integer NOT NULL,
	"job_description" text NOT NULL,
	"user_answer1" text,
	"review1" text,
	"rating1" integer,
	"user_answer2" text,
	"review2" text,
	"rating2" integer,
	"user_answer3" text,
	"review3" text,
	"rating3" integer,
	"user_answer4" text,
	"review4" text,
	"rating4" integer,
	"user_answer5" text,
	"review5" text,
	"rating5" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mcq" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"option1" text NOT NULL,
	"option2" text NOT NULL,
	"option3" text NOT NULL,
	"option4" text NOT NULL,
	"reason" text NOT NULL,
	"answer" integer NOT NULL,
	"job_role" varchar(255) NOT NULL,
	"year_of_exp" integer NOT NULL,
	"tags" varchar(255)[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mcq_result" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"answers" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"image_url" varchar(255),
	"mail_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_mail_id_unique" UNIQUE("mail_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interview_result" ADD CONSTRAINT "interview_result_interview_id_interview_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."interview"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interview_result" ADD CONSTRAINT "interview_result_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mcq_result" ADD CONSTRAINT "mcq_result_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
