
import { usersTable } from "db/schema";
import { and, eq } from "drizzle-orm";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../../drizzle/migrations';

import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

export interface User {
  id: number;
  name: string;
  password: string;
  adminUser: boolean;
}

export type DatabaseContextType = {
  searchUserLogin: (name: string, password: string) => Promise<User[]>;
  searchUser: () => Promise<User[]>;
  createUser: (name: string, password: string, admin?: boolean) => Promise<boolean>;
  adminUser?: boolean;
  success: boolean;
  error: Error | undefined;
  setAdminUser: (value: boolean) => void;
};

export const DatabaseContext = createContext<DatabaseContextType | null>(null);

export interface DatabaseProviderProps {
  db: ExpoSQLiteDatabase<Record<string, never>>;
}

export const DatabaseProvider: FC<PropsWithChildren<DatabaseProviderProps>> = ({ children, db }) => {

  const [adminUser, setAdminUser] = useState(false);
  const { success, error } = useMigrations(db, migrations);
  //    const searchUserLoginLocal = async (): Promise<boolean> => {

  const createUser = async (name: string, password: string, admin = false): Promise<boolean> => {
    const response = await db.insert(usersTable).values({
      nameUser: name,
      passUSer: password,
      adminUser: admin
    });

    if (response)
      return true
    return false

  };

  const searchUser = async () => {
    return await db.select({
      id: usersTable.id,
      name: usersTable.nameUser,
      password: usersTable.passUSer,
      adminUser: usersTable.adminUser
    }).from(usersTable);
  };

  const searchUserLogin = async (name: string, password: string) => {
    const result = await db.select({
      id: usersTable.id,
      name: usersTable.nameUser,
      password: usersTable.passUSer,
      adminUser: usersTable.adminUser ?? false
    })
      .from(usersTable)
      .where(and(
        eq(usersTable.nameUser, name),
        eq(usersTable.passUSer, password)
      ));

    if (result.length === 0) {
      throw new Error("Usuário não encontrado!");
    }

    return result;
  };

  return (
    <DatabaseContext.Provider value={{
      searchUserLogin,
      searchUser,
      createUser,
      adminUser,
      setAdminUser,
      success,
      error
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) throw new Error("useDatabase must be used within an DatabaseProvider");
  return context;
}; 
