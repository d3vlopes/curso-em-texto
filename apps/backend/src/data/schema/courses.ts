import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

import { usersTable } from './users';

export const coursesTable = pgTable(
  'courses',
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 255 }).notNull().unique(),
    description: text().notNull(),
    shortDescription: varchar('short_description', { length: 500 }),
    authorId: uuid('author_id')
      .notNull()
      .references(() => usersTable.id),
    tags: text().array(),
    difficulty: varchar({ length: 20 }).default('beginner').notNull(),
    estimatedHours: integer('estimated_hours').default(0).notNull(),
    status: varchar({ length: 20 }).default('draft').notNull(),
    isPublic: boolean('is_public').default(false).notNull(),
    enrollmentCount: integer('enrollment_count').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('idx_courses_author_id').on(table.authorId),
    index('idx_courses_status').on(table.status),
    index('idx_courses_public').on(table.isPublic, table.status),
    index('idx_courses_tags').using('gin', table.tags),
  ]
);
