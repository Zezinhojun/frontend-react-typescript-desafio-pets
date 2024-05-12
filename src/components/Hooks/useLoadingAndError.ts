import { useState } from "react";

export const useLoadingAndError = (initialState: boolean | null = false) => {
    const [isLoadingOwner, setIsLoadingOwner] = useState<boolean>(false);
    const [errorOwner, setErrorOwner] = useState<string | null>(null);
    const [isLoadingPets, setIsLoadingPets] = useState<boolean>(false);
    const [errorPets, setErrorPets] = useState<string | null>(null);

    const setLoadingOwners = (value: boolean) => {
        setIsLoadingOwner(value);
    };

    const setErrorValueOwner = (value: string | null) => {
        setErrorOwner(value);
    };

    const setLoadingPets = (value: boolean) => {
        setIsLoadingPets(value);
    };

    const setErrorValuePets = (value: string | null) => {
        setErrorPets(value);
    };

    return {
        initialState,
        isLoadingOwner,
        isLoadingPets,
        errorOwner,
        errorPets,
        setLoadingOwners,
        setLoadingPets,
        setErrorValueOwner,
        setErrorValuePets
    };
};
