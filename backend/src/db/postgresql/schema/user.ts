import { pgTable, serial, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("first_name", { length: 50 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  mailId: varchar("mail_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
