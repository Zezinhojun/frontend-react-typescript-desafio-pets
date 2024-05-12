import { useContext } from "react"
import { AppContext } from "../Context/AppContextProvider"
import { deletePet } from "../Services/apiPetsService"
import { useLoadingAndError } from "./useLoadingAndError";
import { IApiError } from "../Interfaces/Error";

export const useDeletePet = () => {
    const { pets, setPets } = useContext(AppContext)
    const { isLoadingPets, errorPets, setLoadingPets, setErrorValuePets } = useLoadingAndError()
    const deletingPet = async (id: string) => {
        try {
            setLoadingPets(true)
            await deletePet(id);
            setPets(pets.filter(pet => pet.id !== id))
        } catch (error: unknown) {
            const apiError = error as IApiError
            setErrorValuePets(apiError.message);
            throw error
        } finally {
            setLoadingPets(false);
        }
    }
    return { isLoadingPets, errorPets, deletingPet };
}