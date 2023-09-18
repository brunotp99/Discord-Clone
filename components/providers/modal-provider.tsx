"use client"

import { useEffect, useState } from "react"

import { CreateServerModal } from "@/components/models/create-server-modal"
import { InviteModal } from "@/components/models/invite-modal"
import { EditServerModal } from "@/components/models/edit-server-modal"
import { MembersModal } from "@/components/models/members-modal"
import { CreateChannelModal } from "@/components/models/create-channel-modal"
import { LeaverServerModal } from "@/components/models/leave-server-modal"
import { DeleteServerModal } from "@/components/models/delete-server-modal"
import { DeleteChannelModal } from "@/components/models/delete-channel-modal"
import { EditChannelModal } from "@/components/models/edit-channel-modal"
import { MessageFileModal } from "@/components/models/message-file-modal"

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
            <CreateChannelModal />
            <LeaverServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
            <EditChannelModal />
            <MessageFileModal />
        </>
    )
}