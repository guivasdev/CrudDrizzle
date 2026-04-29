import { createContext, FC, PropsWithChildren, useContext } from "react";
import { usersTable } from "db/schema";
import { and, eq } from "drizzle-orm";
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
  deleteUserDb: (id: number) => Promise<boolean>;
};

export const DatabaseContext = createContext<DatabaseContextType | null>(null);

export interface DatabaseProviderProps {
  db: ExpoSQLiteDatabase<Record<string, never>>;
}

export const DatabaseProvider: FC<PropsWithChildren<DatabaseProviderProps>> = ({ children, db }) => {

  const createUser = async (name: string, password: string, admin = false): Promise<boolean> => {
    try {
      await db.insert(usersTable).values({
        nameUser: name,
        passUSer: password,
        adminUser: admin
      });
      return true

    } catch (error) {
      console.log(error)
      return false
    }
  }

  const searchUser = async () => {
    try {
      return await db.select({
        id: usersTable.id,
        name: usersTable.nameUser,
        password: usersTable.passUSer,
        adminUser: usersTable.adminUser
      }).from(usersTable);
    } catch (error) {
      console.log(error)
      return []
    }
  }

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

    if (result.length == 0)
      throw new Error("Usuário não encontrado!");

    return result;
  }

  const deleteUserDb = async (id: number): Promise<boolean> => {
    try {
      await db.delete(usersTable).where(eq(usersTable.id, id))

      return true;
    } catch (error) {
      console.log(error)
      return false

    }

  }

  return (
    <DatabaseContext.Provider value={{
      searchUserLogin,
      searchUser,
      createUser,
      deleteUserDb,
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