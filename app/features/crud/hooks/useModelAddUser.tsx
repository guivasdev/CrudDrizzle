import { useDatabase } from "@/context/DatabaseContext";
import { useState } from "react";

export function useModelAddUser() {

    const [modalVisible, setModalVisible] = useState(false)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [admin, setAdmin] = useState(false)

    const { createUser } = useDatabase();

    const addUser = async () => {
        if (!name || !password) throw new Error("Insira valores válidos para adicionar novo usuário!");
        
        await createUser(name, password, admin);
    }

    return {
        modalVisible,
        name,
        password,
        admin,
        setModalVisible,
        setName,
        setPassword,
        setAdmin,
        addUser,
    }
}