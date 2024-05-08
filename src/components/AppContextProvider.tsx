import { createContext, ReactNode, useState } from "react";

interface IAppContext {
    isOn: boolean
    setIsOn: (isOn: boolean) => void
    myName: string
    name: string
    setName: (name: string) => void
}

export const AppContext = createContext({} as IAppContext)

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const myName = "Junior"
    const [isOn, setIsOn] = useState<boolean>(false)
    const [name, setName] = useState<string>(myName)


    return (
        <AppContext.Provider value={{ setIsOn, isOn, myName, name, setName }}>
            {children}
        </AppContext.Provider >
    )
}