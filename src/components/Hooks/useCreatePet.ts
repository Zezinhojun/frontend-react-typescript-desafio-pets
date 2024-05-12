import { useContext, useState } from "react"
import { IPet } from "../Interfaces/Pet"
import { createPet } from "../Services/apiPetsService"
import { AppContext } from "../Context/AppContextProvider"
import { useLoadingAndError } from "./useLoadingAndError";
import { IApiError } from "../Interfaces/Error";

export const useCreatePet = () => {
    const { pets, setPets } = useContext(AppContext)
    const { isLoadingPets, errorPets, setLoadingPets, setErrorValuePets } = useLoadingAndError()
    const [ownerId, setOwnerId] = useState<string | null>(null);

    const createOnePet = async (petData: IPet): Promise<void> => {
        try {
            setLoadingPets(true)
            if (!ownerId) {
                throw new Error("Owner ID is required");
            }
            const newPet = await createPet(petData, ownerId)
            setPets([...pets, newPet])
        } catch (error: unknown) {
            const apiError = error as IApiError
            setErrorValuePets(apiError.message);
            throw error
        } finally {
            setLoadingPets(false);
        }
    }

    return { createOnePet, errorPets, isLoadingPets, setOwnerId, ownerId }
}