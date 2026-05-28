import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { slugify } from "@/lib/slugify"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"


export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()

    const guide = await prisma.guide.create({
      data: {
        title: body.title,
        content: body.content,
        slug: slugify(body.title),
        published: false,

        game: {
          connect: {
            id: body.gameId
          }
        },

        author: {
          connect: {
            id: Number(session.user.id)
          }
        },
        
        tags: {
          connect: body.tags.map((id: number) => ({
          id
        }))
        }
      }
    })

    return NextResponse.json(guide)

  } catch (error) {

    console.error("GUIDE CREATE ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}