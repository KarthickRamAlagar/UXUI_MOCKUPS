import { id } from "date-fns/locale";
import {
  integer,
  pgTable,
  varchar,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(5),
});

export const ProjectTable = pgTable("projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  projectId: varchar().notNull(),

  userInput: varchar(),

  device: varchar(),

  createdOn: timestamp("created_on").defaultNow(),

  config: json(),

  userId: varchar()
    .references(() => usersTable.email)
    .notNull(),
});
