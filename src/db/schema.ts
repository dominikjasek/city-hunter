import {mysqlTable, serial, text} from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
    id: serial('id').primaryKey(),
});
