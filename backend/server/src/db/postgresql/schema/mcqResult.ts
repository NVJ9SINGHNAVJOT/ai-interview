import { pgTable, serial, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { user } from "@/db/postgresql/schema/user";
import { relations } from "drizzle-orm";

export type Answer = {
  mcqId: number;
  userAnswer: number;
};

export type AnswersArray = Answer[];

export const mcqResult = pgTable("mcq_result", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => user.id)
    .notNull(),
  checked: boolean("checked").default(false).notNull(),
  answers: jsonb("answers").$type<AnswersArray>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const mcqResultRelations = relations(mcqResult, ({ one }) => ({
  user: one(user, { fields: [mcqResult.userId], references: [user.id] }),
}));
