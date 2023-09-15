import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: {params: {memberId: string}}
) {
    try{
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if(!profile){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!serverId){
            return new NextResponse("Server Id Missing", {status: 400})
        }

        if(!params.memberId){
            return new NextResponse("Member Id Missing", {status: 400})
        }

        const server = db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id //users cant kick themselfs
                        }
                    }
                }
            },
            include: { // we need this to return the results updated
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })

        return NextResponse.json(server);

    }catch(error){
        console.log("[MEMBER_ID_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: {params: {memberId: string}}
) {
    try{
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();

        const serverId = searchParams.get("serverId");

        if(!profile){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!serverId){
            return new NextResponse("Server Id Missing", {status: 400})
        }

        if(!params.memberId){
            return new NextResponse("Member Id Missing", {status: 400})
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id //we dont want the admin to update himself
                            }
                        },
                        data: {
                            role
                        }
                    }
                }
            },
            include: { // we need this to return the results updated
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })

        return NextResponse.json(server);

    }catch(error){
        console.log("[MEMBERS_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}