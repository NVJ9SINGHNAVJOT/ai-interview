import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const interview = pgTable("interview", {
  id: serial("id").primaryKey(),
  jobRole: varchar("job_role", { length: 255 }).notNull(),
  yearOfExp: integer("year_of_exp").notNull(),
  question1: text("question_1").notNull(),
  answer1: text("answer_1").notNull(),
  question2: text("question_2").notNull(),
  answer2: text("answer_2").notNull(),
  question3: text("question_3").notNull(),
  answer3: text("answer_3").notNull(),
  question4: text("question_4").notNull(),
  answer4: text("answer_4").notNull(),
  question5: text("question_5").notNull(),
  answer5: text("answer_5").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
