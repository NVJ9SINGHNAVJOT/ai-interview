import { pgTable, serial, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { users } from "@/db/postgresql/schema/users";
import { relations } from "drizzle-orm";

export type Answer = {
  mcqId: number;
  userAnswer: number;
};

export type AnswersArray = Answer[];

export const mcqResults = pgTable("mcq_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  checked: boolean("checked").default(false).notNull(),
  answers: jsonb("answers").$type<AnswersArray>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const mcqResultRelations = relations(mcqResults, ({ one }) => ({
  user: one(users, { fields: [mcqResults.userId], references: [users.id] }),
}));
