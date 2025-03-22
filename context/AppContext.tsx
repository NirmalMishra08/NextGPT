"use client"

import { useUser } from "@clerk/nextjs";
import { createContext, useContext } from "react"

//@ts-ignore

export const AppContext = createContext();




export const AppContextProvider = ({children}:any)=>{
    const {user} = useUser()

    const value={
        user
    }
    return (
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        )
}
