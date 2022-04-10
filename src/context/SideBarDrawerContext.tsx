import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useContext, useEffect } from "react";

interface SideBarDrawerProviderProps{
    children: ReactNode
}

type SideBarContextData = UseDisclosureReturn

const SideBarDrawerContext = createContext({} as SideBarContextData)

export function SideBarDrawerProvider({children} : SideBarDrawerProviderProps){
    
    const disclosure = useDisclosure()
    const router = useRouter()

    useEffect(() => {
        disclosure.onClose()
    }, [router.asPath])
    
    return (
        <SideBarDrawerContext.Provider value={disclosure}>
            {children}
        </SideBarDrawerContext.Provider>
    )
}


export const useSideBarDrawer = () => useContext(SideBarDrawerContext)