import { id } from "date-fns/locale"
import { usersTable } from "db/schema"
import { and, eq } from "drizzle-orm"
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../../drizzle/migrations';

import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react"

import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
export type DatabaseContextType = {
  searchUser: () => Promise<any>
  createUser: () => void
  userNameSearch: any,
  setUserNameSearch: any,
  userPassSearch: any,
  setUserPassSearch: any,
  adminUser?: boolean,
  success: boolean,
  error: Error | undefined,
}

export const DatabaseContext = createContext<DatabaseContextType | null>(null)

export interface DatabaseProviderProps {
}

export const DatabaseProvider: FC<PropsWithChildren<DatabaseProviderProps>> = ({ children }) => {
  const [userNameSearch, setUserNameSearch] = useState("")
  const [userPassSearch, setUserPassSearch] = useState("")
  const [adminUser, setAdminUser] = useState(false)

  const expo = SQLite.openDatabaseSync('db.db');
  const db = drizzle(expo);
  const { success, error } = useMigrations(db, migrations);


  const createUser = async () => {

    const insertResult = await db.insert(usersTable).values(
      { nameUser: 'gui', passUSer: '123', adminUser: true })
  }

  const searchUser = async () => {

    if (!userNameSearch || !userPassSearch) throw new Error("Insira valores válidos!");

    const getResult = await db.select({
      id: usersTable.id,
      userNameSearch: usersTable.nameUser,
      userPassSearch: usersTable.passUSer,
      adminUser: usersTable.adminUser ?? false
    })
      .from(usersTable)
      .where(and(eq(usersTable.nameUser, userNameSearch), eq(usersTable.passUSer, userPassSearch)));

    if (getResult.length == 0) throw new Error("Usuário não encontrado!");


    return getResult
  }
  const value = {
    searchUser,
    userNameSearch,
    setUserNameSearch,
    userPassSearch,
    setUserPassSearch,
    adminUser,
    success,
    error,
    createUser,
  }
  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>
}

export const useDatabase = () => {
  const context = useContext(DatabaseContext)
  if (!context) throw new Error("useDatabase must be used within an DatabaseProvider")
  return context
}
