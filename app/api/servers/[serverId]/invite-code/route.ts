import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";


//again we use serverId because is the name of the [folder]
export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try{
        const profile = await currentProfile();
        if(!profile){
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!params.serverId){
            return new NextResponse("Server ID Missing", {status: 400})
        }
        //only admins can refresh the id because we are checking if the request was made by who created the server
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                inviteCode: uuidv4()
            }
        })
        return NextResponse.json(server)
    }catch(error){
        console.log("[SERVER_ID]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}