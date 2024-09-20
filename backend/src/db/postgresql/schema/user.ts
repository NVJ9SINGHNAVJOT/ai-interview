import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("first_name", { length: 50 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  mailId: varchar("mail_id", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
