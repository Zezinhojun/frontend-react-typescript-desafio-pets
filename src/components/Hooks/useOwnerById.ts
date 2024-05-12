import { IApiError } from "../Interfaces/Error";
import { getOneOwner } from "../Services/apiOwnerService";
import { useLoadingAndError } from "./useLoadingAndError";

export const useOwnerById = () => {
    const { isLoadingOwner, errorOwner, setLoadingOwners, setErrorValueOwner } = useLoadingAndError()

    const fetchOwner = async (id: string) => {
        setLoadingOwners(true)
        try {
            await getOneOwner(id)
        } catch (error: unknown) {
            const apiError = error as IApiError
            setErrorValueOwner(apiError.message);
        } finally {
            setLoadingOwners(false);
        }
    }

    return { isLoadingOwner, errorOwner, fetchOwner }
}