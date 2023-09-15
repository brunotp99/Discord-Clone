"use client"

import { useEffect, useState } from "react"

import { CreateServerModal } from "@/components/models/create-server-modal"
import { InviteModal } from "@/components/models/invite-modal"
import { EditServerModal } from "@/components/models/edit-server-modal"
import { MembersModal } from "@/components/models/members-modal"

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    //Isto permite evitar que o modal seja carregado no server code
    if(!isMounted){
        return null;
    }

    return(
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
        </>
    )
}