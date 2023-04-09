import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 100 }).primaryKey(),
  nickName: varchar('nick_name', { length: 40 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferModel<typeof users>;
export type CreateUser = InferModel<typeof users, 'insert'>;
