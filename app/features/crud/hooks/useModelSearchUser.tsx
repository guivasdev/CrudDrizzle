import { useDatabase } from "@/context/DatabaseContext";
import { useState } from "react";

export function useModelSearchUser() {

    const [modalVisible, setModalVisible] = useState(false)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [admin, setAdmin] = useState(false)

    const { searchUser, searchUserLogin, createUser} = useDatabase();

    const searchUserLocal = async () => {
        if (!name || !password) throw new Error("Insira valores válidos para adicionar novo usuário!");
        const response = await searchUser();
        console.log(":::", response)
    }

    const searchUserLoginLocal = async (): Promise<boolean> => {
        if (!name || !password) throw new Error("Insira valores válidos para procurar um usuário!");

        try {
            const response = await searchUserLogin(name, password);
            console.log(":::", response);

            return true
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return {
        modalVisible,
        name,
        password,
        admin,
        setModalVisible,
        setName,
        setPassword,
        setAdmin,
        searchUserLocal,
        searchUserLoginLocal
    }
}