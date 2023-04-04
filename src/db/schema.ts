import { mysqlTable, serial, text } from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
});

type NewUser = InferModel<typeof users, 'insert'>;
