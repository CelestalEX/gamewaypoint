import { prisma } from "@/lib/prisma"

import { NextResponse } from "next/server"

import { slugify } from "@/lib/slugify"

export async function POST(req: Request) {

  try {
    const body = await req.json()

    const tag = await prisma.tag.create({
      data: {
        name: body.name,
        slug: slugify(body.name)
      }
    })

    return NextResponse.json(tag)

  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to create tag"
      },
      {
        status: 500
      }
    )
  }
}