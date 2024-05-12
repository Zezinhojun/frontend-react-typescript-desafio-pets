import { useEffect, useState } from "react"
import { IPet } from "../Interfaces/Pet"
import { getAllPetsOfOwner } from "../Services/apiOwnerService";
import { IApiError } from "../Interfaces/Error";
import { useLoadingAndError } from "./useLoadingAndError";

export const usePetsByOwner = (ownerId: string) => {
    const [pets, setPets] = useState<IPet[]>([])
    const { isLoadingOwner, errorOwner, setLoadingOwners, setErrorValueOwner } = useLoadingAndError()

    useEffect(() => {
        const fetchPetsOfOwner = async () => {
            setLoadingOwners(true)
            try {
                const fetchedPetsOfOwner = await getAllPetsOfOwner(ownerId)
                setPets(fetchedPetsOfOwner)
            } catch (error: unknown) {
                const apiError = error as IApiError
                setErrorValueOwner(apiError.message);
            } finally {
                setLoadingOwners(false);
            }
        }
        fetchPetsOfOwner()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ownerId])
    return { pets, isLoadingOwner, errorOwner };
}