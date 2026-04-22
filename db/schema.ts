import { int, sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  nameUser: text().notNull(),
  passUSer: text().notNull(),
  adminUser: integer({mode:'boolean'}).notNull(),
  
});
