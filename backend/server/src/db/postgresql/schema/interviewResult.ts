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
      .references(() => user.id)
      .notNull(),

    checked: boolean("checked").default(false).notNull(),
    jobDescription: text("job_description").notNull(),

    userAnswer1: text("user_answer_1"),
    review1: text("review_1"),
    rating1: integer("rating_1"),

    userAnswer2: text("user_answer_2"),
    review2: text("review_2"),
    rating2: integer("rating_2"),

    userAnswer3: text("user_answer_3"),
    review3: text("review_3"),
    rating3: integer("rating_3"),

    userAnswer4: text("user_answer_4"),
    review4: text("review_4"),
    rating4: integer("rating_4"),

    userAnswer5: text("user_answer_5"),
    review5: text("review_5"),
    rating5: integer("rating_5"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
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
