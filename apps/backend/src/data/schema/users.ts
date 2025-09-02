import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  boolean,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  avatar: text(),
  googleId: varchar('google_id', { length: 255 }).unique(),
  githubId: varchar('github_id', { length: 255 }).unique(),
  role: varchar({ length: 50 }).default('user').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
