import { id } from "date-fns/locale"
import { usersTable } from "db/schema"
import { and, eq } from "drizzle-orm"
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../../drizzle/migrations';

import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react"
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

export interface User {
  id: number
  userNameSearch: string
  userPassSearch: string
  adminUser: boolean
}
export type DatabaseContextType = {
  searchUserLogin: () => Promise<Array<User>>
  searchUser: () => Promise<Array<User>>
  createUser: () => Promise<Array<User>>
  userNameSearch: any,
  setUserNameSearch: any,
  userPassSearch: any,
  setUserPassSearch: any,
  adminUser?: boolean,
  success: boolean,
  error: Error | undefined,
  setAdminUser: any
}

export const DatabaseContext = createContext<DatabaseContextType | null>(null)

export interface DatabaseProviderProps {
  db: ExpoSQLiteDatabase<Record<string, never>>
}

export const DatabaseProvider: FC<PropsWithChildren<DatabaseProviderProps>> = ({ children, db }) => {
  const [userNameSearch, setUserNameSearch] = useState("")
  const [userPassSearch, setUserPassSearch] = useState("")
  const [adminUser, setAdminUser] = useState(false)

  const { success, error } = useMigrations(db, migrations);


  const createUser = async () => {
    if (!userNameSearch || !userPassSearch) throw new Error("Insira valores válidos!");

    const insertResult = await db.insert(usersTable).values(
      { nameUser: userNameSearch, passUSer: userPassSearch, adminUser: adminUser })
    return []
  }
  const searchUser = async () => {
    if (!userNameSearch || !userPassSearch) throw new Error("Insira valores válidos!");
    const getResult = await db.select({
      id: usersTable.id,
      userNameSearch: usersTable.nameUser,
      userPassSearch: usersTable.passUSer,
      adminUser: usersTable.adminUser
    })
      .from(usersTable)


    return getResult
  }

  const searchUserLogin = async () => {

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
    searchUserLogin,
    searchUser,
    userNameSearch,
    setUserNameSearch,
    userPassSearch,
    setUserPassSearch,
    adminUser,
    setAdminUser,
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
