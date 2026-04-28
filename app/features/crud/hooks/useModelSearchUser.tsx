import { useDatabase, User } from "@/context/DatabaseContext";
import { useState } from "react";

export function useModelSearchUser() {

    const [modalVisibleSearch, setModalVisibleSearch] = useState(false)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [admin, setAdmin] = useState(false)

    const { searchUser, searchUserLogin } = useDatabase();

    const searchAllUsers = async (): Promise<User[]> => {
        const response = await searchUser();
        console.log(":::", response)
        return response
    }

    const searchUserLoginLocal = async (): Promise<boolean> => {
        if (!name || !password) throw new Error("Insira valores válidos para procurar um usuário!");

        try {
            const teste = await searchUserLogin(name, password);
            console.log(teste)
            return true
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return {
        modalVisibleSearch,
        name,
        password,
        admin,
        setModalVisibleSearch,
        setName,
        setPassword,
        setAdmin,
        searchAllUsers,
        searchUserLoginLocal
    }
}