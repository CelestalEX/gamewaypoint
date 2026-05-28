import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q")

    if(!query){
        return NextResponse.json([])
    }

    const guides = await prisma.guide.findMany({
        where:{
            published: true,

            OR: [
                {
                    title: {
                        contains: query,
                        mode: "insensitive"
                    }
                },

                {
                    content: {
                        contains: query,
                        mode: "insensitive"
                    }
                }
            ]
        },

        include: {
            game: true
        },

        take: 10
    })

    const games = await prisma.game.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive"
            }
        },

        take: 5

    })

    return NextResponse.json({
        guides,
        games
    })

}