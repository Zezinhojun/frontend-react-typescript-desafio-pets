import { getOnePet } from "../Services/apiPetsService";
import { useLoadingAndError } from "./useLoadingAndError";
import { IApiError } from "../Interfaces/Error";

export const usePetById = () => {
    const { isLoadingPets, errorPets, setLoadingPets, setErrorValuePets } = useLoadingAndError()

    const fetchedPet = async (id: string) => {
        setLoadingPets(true)
        try {
            await getOnePet(id)
        } catch (error: unknown) {
            const apiError = error as IApiError
            setErrorValuePets(apiError.message);
        } finally {
            setLoadingPets(false);
        }
    }
    return { isLoadingPets, errorPets, fetchedPet }
}