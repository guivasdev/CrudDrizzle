import { useDatabase } from "@/context/DatabaseContext";
import { useState } from "react";

export function useDeleteUser() {

    const [idUser, setIdUser] = useState(Number)
    const { deleteUserDb } = useDatabase();

    const deleteUser = async (idUser: number): Promise<boolean> => {
        console.log(idUser)
        if (!idUser) throw new Error("Id do usuário inválido!");

        await deleteUserDb(idUser);
        return true
    }

    return {
        idUser,
        setIdUser,
        deleteUser,
    }
}