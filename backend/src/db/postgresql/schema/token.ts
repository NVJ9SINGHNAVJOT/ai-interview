import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { user } from "@/db/postgresql/schema/user";
import { relations } from "drizzle-orm";

export const token = pgTable("token", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 1024 }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const tokenRelations = relations(token, ({ one }) => ({
  user: one(user, { fields: [token.userId], references: [user.id] }),
}));
