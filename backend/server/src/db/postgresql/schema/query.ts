import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const query = pgTable("query", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name").notNull(),
  emailId: varchar("email_id").notNull(),
  queryText: varchar("query_text", { length: 500 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
