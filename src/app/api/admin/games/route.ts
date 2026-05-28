import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/isAdmin"
import { generateSlug } from "@/lib/generateSlug"

export async function POST(req: Request) {
  try {
    
    await requireAdmin()
    
    const body = await req.json()
    const slug = await generateSlug(body.title)

    if (!body.title) {
      return NextResponse.json(
        { error: "Title required" },
        { status: 400 }
      )
    }

    const game = await prisma.game.create({
        data: {
            title: body.title,
            slug,
            genre: body.genre,
            image: body.image,
            description: body.description
        }
    })


    return NextResponse.json(game)

  } catch (error) {
    console.error("ADMIN GAME ERROR:", error)

  return NextResponse.json(
    { error: "Internal error" },
    { status: 500 }
  )
}
}