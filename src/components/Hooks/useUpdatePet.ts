import { useContext } from "react"
import { AppContext } from "../Context/AppContextProvider"
import { IPet } from "../Interfaces/Pet"
import { updatePet } from "../Services/apiPetsService"
import { useLoadingAndError } from "./useLoadingAndError";
import { IApiError } from "../Interfaces/Error";

export const useUpdatePet = () => {
    const { setPets, pets } = useContext(AppContext)
    const { isLoadingPets, errorPets, setLoadingPets, setErrorValuePets } = useLoadingAndError()

    const petUpdate = async (id: string, updatedData: Partial<IPet>) => {
        setLoadingPets(true)
        try {
            const updatedPet = await updatePet(id, updatedData)
            const petIndex = pets.findIndex(pet => pet.id === updatedPet.id)
            if (petIndex !== 1) {
                const updatedPets = [...pets]
                updatedPets[petIndex] = updatedPet
                setPets(updatedPets)
            }
        } catch (error: unknown) {
            const apiError = error as IApiError
            setErrorValuePets(apiError.message);
        } finally {
            setLoadingPets(false);
        }
    }
    return { isLoadingPets, errorPets, petUpdate };
}