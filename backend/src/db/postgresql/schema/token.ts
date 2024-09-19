import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const token = pgTable("token", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 1024 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
