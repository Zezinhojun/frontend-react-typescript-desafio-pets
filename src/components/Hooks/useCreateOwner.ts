import { useContext } from "react"
import { createOwner } from "../Services/apiOwnerService";
import { IOwner } from "../Interfaces/Owner";
import { AppContext } from "../Context/AppContextProvider";
import { IApiError } from "../Interfaces/Error";
import { useLoadingAndError } from "./useLoadingAndError";

export const useCreateOwner = () => {
    const { owners, setOwners } = useContext(AppContext)
    const { isLoadingOwner, errorOwner, setLoadingOwners, setErrorValueOwner } = useLoadingAndError()

    const createOneOwner = async (ownerData: IOwner): Promise<IOwner> => {
        setLoadingOwners(true)
        try {
            const newOwner = await createOwner(ownerData);
            setOwners([...owners, newOwner]);
            return newOwner
        } catch (error: unknown) {
            const apiError = error as IApiError
            setErrorValueOwner(apiError.message);
            throw error
        } finally {
            setLoadingOwners(false);
        }
    }
    return { isLoadingOwner, errorOwner, createOneOwner };
}