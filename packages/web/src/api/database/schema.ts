import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const appointmentRequests = sqliteTable("appointment_requests", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  date: text("preferred_date").notNull(),
  time: text("preferred_time").notNull(),
  notes: text("notes").notNull(),
  status: text("status").notNull().default("pending"),
  consentVersion: text("consent_version").notNull().default("preview-v1"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});
