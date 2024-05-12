import { useContext, useEffect } from "react"
import { getAllPets } from "../Services/apiPetsService"
import { AppContext } from "../Context/AppContextProvider"
import { IApiError } from "../Interfaces/Error"
import { useLoadingAndError } from "./useLoadingAndError"

export const usePets = () => {
    const { pets, setPets } = useContext(AppContext)
    const { isLoadingPets, errorPets, setLoadingPets, setErrorValuePets } = useLoadingAndError()

    useEffect(() => {
        const fetchPets = async () => {
            setLoadingPets(true)
            try {
                const fetchedPets = await getAllPets()
                setPets(fetchedPets)
            } catch (error: unknown) {
                const apiError = error as IApiError
                setErrorValuePets(apiError.message);
            } finally {
                setLoadingPets(false);
            }
        }
        fetchPets()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setPets])
    return { pets, isLoadingPets, errorPets }
}