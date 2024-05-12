import { createContext, ReactNode, useState } from "react";
import { IOwner } from "../Interfaces/Owner";
import { IPet } from "../Interfaces/Pet";

interface IAppContext {
    myName: string
    showOwner: boolean
    setShowOwner: (show: boolean) => void
    showPetForm: boolean
    setShowPetForm: (show: boolean) => void
    owners: IOwner[]
    setOwners: (owner: IOwner[]) => void
    showOwnerEditForm: boolean
    setShowOwnerEditForm: (show: boolean) => void
    showPetEditForm: boolean
    setShowPetEditForm: (show: boolean) => void
    pets: IPet[]
    setPets: (pet: IPet[]) => void
}

export const AppContext = createContext({} as IAppContext)

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const myName = "Junior"
    const [showOwner, setShowOwner] = useState(false);
    const [showPetForm, setShowPetForm] = useState(false)
    const [showOwnerEditForm, setShowOwnerEditForm] = useState(false)
    const [showPetEditForm, setShowPetEditForm] = useState(false)
    const [owners, setOwners] = useState<IOwner[]>([]);
    const [pets, setPets] = useState<IPet[]>([])



    return (
        <AppContext.Provider value={{ myName, showOwner, setShowOwner, showPetForm, setShowPetForm, owners, setOwners, showOwnerEditForm, setShowOwnerEditForm, showPetEditForm, setShowPetEditForm, pets, setPets }}>
            {children}
        </AppContext.Provider >
    )
}