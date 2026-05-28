import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/isAdmin"

type Props = {
    params: Promise<{
        id: string
    }>
}

export async function DELETE( req: Request, { params }: Props) {
    try {
        await requireAdmin()

        const { id } = await params

        console.log("DELETING GAME:", id)

        await prisma.game.delete({
            where: {
                id: Number(id)
            }
        })

        console.log("DELETED")

        return NextResponse.json({
            success: true
        })
        
    } catch (error: any){
        console.log(error)

        return NextResponse.json(
            { error: error.message },
            { status: 500}
        )
    }
    
}