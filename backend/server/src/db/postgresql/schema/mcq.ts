import { pgTable, serial, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const mcq = pgTable("mcq", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  option1: text("option_1").notNull(),
  option2: text("option_2").notNull(),
  option3: text("option_3").notNull(),
  option4: text("option_4").notNull(),
  reason: text("reason").notNull(),
  answer: integer("answer").notNull(),
  jobRole: varchar("job_role", { length: 255 }).notNull(),
  yearOfExp: integer("year_of_exp").notNull(),
  tags: varchar("tags", { length: 255 }).array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
