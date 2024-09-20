import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 15 }).notNull(),
  lastName: varchar("last_name", { length: 15 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});