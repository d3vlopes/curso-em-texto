import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const exampleUsersTable = pgTable('example_users', {
  id: serial().primaryKey(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  username: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
