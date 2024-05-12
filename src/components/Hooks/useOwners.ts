import { useContext, useEffect } from "react"
import { getAllOwners } from "../Services/apiOwnerService"
import { AppContext } from "../Context/AppContextProvider";
import { useLoadingAndError } from "./useLoadingAndError";
import { IApiError } from "../Interfaces/Error";

export const useOwners = () => {
    const { owners, setOwners } = useContext(AppContext)
    const { isLoadingOwner, errorOwner, setLoadingOwners, setErrorValueOwner } = useLoadingAndError()

    useEffect(() => {
        const fetchOwners = async () => {
            setLoadingOwners(true)
            try {
                const fetchedOwners = await getAllOwners();
                setOwners(fetchedOwners);
            } catch (error: unknown) {
                const apiError = error as IApiError
                setErrorValueOwner(apiError.message);
            } finally {
                setLoadingOwners(false);
            }
        }
        fetchOwners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setOwners])

    return { owners, isLoadingOwner, errorOwner, };
}

