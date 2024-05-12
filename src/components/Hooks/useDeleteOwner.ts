import { useContext } from "react"
import { deleteOwner } from "../Services/apiOwnerService";
import { AppContext } from "../Context/AppContextProvider";
import { useLoadingAndError } from "./useLoadingAndError";
import { IApiError } from "../Interfaces/Error";

export const useDeleteOwner = () => {
    const { owners, setOwners } = useContext(AppContext)
    const { isLoadingOwner, errorOwner, setLoadingOwners, setErrorValueOwner } = useLoadingAndError()

    const deletingOwner = async (id: string) => {
        try {
            setLoadingOwners(true)
            await deleteOwner(id);
            setOwners(owners.filter(owner => owner.id !== id));
        } catch (error: unknown) {
            const apiError = error as IApiError
            setErrorValueOwner(apiError.message);
            throw error
        } finally {
            setLoadingOwners(false);
        }
    }

    return { deletingOwner, isLoadingOwner, errorOwner };
}