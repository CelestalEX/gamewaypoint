import { prisma } from "@/lib/prisma"

import { NextResponse } from "next/server"

import { slugify } from "@/lib/slugify"

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(
  req: Request,
  { params }: Props
) {

  try {

    const { id } = await params

    const body = await req.json()
    

    const guide =
      await prisma.guide.update({

        where: {
          id: Number(id)
        },

        data: {
          title: body.title,
          slug: slugify(body.title),
          content: body.content,
          published: body.published,

          tags: {
            set: body.tags.map(
              (id: number) => ({
                id
              })
            )
          }
        }

      })

    return NextResponse.json(guide)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to update"
      },
      {
        status: 500
      }
    )
  }
}