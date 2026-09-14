// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const resources = sqliteTable("resources", {
  id: text("id").primaryKey(),
  data: text("data").notNull(),
  verifiedAt: text("verified_at").notNull(),
});

export const submissions = sqliteTable("submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  resourceId: text("resource_id"),
  data: text("data").notNull(),
  contactEmail: text("contact_email").notNull(),
  submittedAt: text("submitted_at").notNull(),
  status: text("status").notNull().default("pending"),
});
