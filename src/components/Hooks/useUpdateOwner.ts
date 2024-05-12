import { useContext } from "react"
import { IOwner } from "../Interfaces/Owner"
import { updateOwner } from "../Services/apiOwnerService";
import { AppContext } from "../Context/AppContextProvider";
import { IApiError } from "../Interfaces/Error";
import { useLoadingAndError } from "./useLoadingAndError";

export const useUpdateOwner = () => {
    const { setOwners, owners } = useContext(AppContext)
    const { isLoadingOwner, errorOwner, setLoadingOwners, setErrorValueOwner } = useLoadingAndError()

    const ownerUpdate = async (id: string, updatedData: Partial<IOwner>) => {
        setLoadingOwners(true)
        try {
            const updatedOwner = await updateOwner(id, updatedData);
            const ownerIndex = owners.findIndex(owner => owner.id === updatedOwner.id);
            if (ownerIndex !== -1) {
                const updatedOwners = [...owners];
                updatedOwners[ownerIndex] = updatedOwner;
                setOwners(updatedOwners);
            } else {
                setOwners([...owners, updatedOwner]);
            }
        } catch (error: unknown) {
            const apiError = error as IApiError
            setErrorValueOwner(apiError.message);
        } finally {
            setLoadingOwners(false);
        }
    }
    return { isLoadingOwner, errorOwner, ownerUpdate };
}