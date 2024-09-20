import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Define the interview table with 5 questions and answers
export const interview = pgTable("interview", {
  id: serial("id").primaryKey(),
  jobPositon: varchar("job_position", { length: 255 }).notNull(),
  tags: varchar("tags", { length: 255 }).array().notNull(),
  yearOfExp: integer("year_of_exp").notNull(),
  question1: text("question1").notNull(),
  answer1: text("answer1").notNull(),
  question2: text("question2").notNull(),
  answer2: text("answer2").notNull(),
  question3: text("question3").notNull(),
  answer3: text("answer3").notNull(),
  question4: text("question4").notNull(),
  answer4: text("answer4").notNull(),
  question5: text("question5").notNull(),
  answer5: text("answer5").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
