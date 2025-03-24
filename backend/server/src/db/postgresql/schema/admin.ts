import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  emailId: varchar("email_id", { length: 255 }).unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
