import { pgTable, serial, text, integer, timestamp, boolean, unique } from "drizzle-orm/pg-core";
import { user } from "@/db/postgresql/schema/user";
import { interview } from "@/db/postgresql/schema/interview";
import { relations } from "drizzle-orm";

export const interviewResult = pgTable(
  "interview_result",
  {
    id: serial("id").primaryKey(),
    interviewId: integer("interview_id")
      .references(() => interview.id)
      .notNull(),

    userId: integer("user_id")
      .notNull()
      .references(() => user.id),
    checked: boolean("checked").notNull().default(false),
    jobDescription: text("job_description").notNull(),

    userAnswer1: text("user_answer1"),
    review1: text("review1"),
    rating1: integer("rating1"),

    userAnswer2: text("user_answer2"),
    review2: text("review2"),
    rating2: integer("rating2"),

    userAnswer3: text("user_answer3"),
    review3: text("review3"),
    rating3: integer("rating3"),

    userAnswer4: text("user_answer4"),
    review4: text("review4"),
    rating4: integer("rating4"),

    userAnswer5: text("user_answer5"),
    review5: text("review5"),
    rating5: integer("rating5"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (interviewResult) => ({
    interviewResultInterviewIdUserId: unique("interview_result_interview_id_user_id_unique").on(
      interviewResult.interviewId,
      interviewResult.userId
    ),
  })
);

export const interviewResultRelations = relations(interviewResult, ({ one }) => ({
  user: one(user, { fields: [interviewResult.userId], references: [user.id] }),
  interview: one(interview, { fields: [interviewResult.interviewId], references: [interview.id] }),
}));
