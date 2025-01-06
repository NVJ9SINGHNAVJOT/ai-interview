import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const interview = pgTable("interview", {
  id: serial("id").primaryKey(),
  jobPositon: varchar("job_position", { length: 255 }).notNull(),
  yearOfExp: integer("year_of_exp").notNull(),
  question1: text("question1").notNull(),
  question2: text("question2").notNull(),
  question3: text("question3").notNull(),
  question4: text("question4").notNull(),
  question5: text("question5").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
