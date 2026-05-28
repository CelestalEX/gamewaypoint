import { prisma } from "@/lib/prisma"

import { NextResponse } from "next/server"

import { revalidatePath } from "next/cache"

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

    await prisma.guide.update({

      where: {
        id: Number(id)
      },

      data: {
        content: body.content
      }
    })

    revalidatePath(`/guides/${id}`)
    revalidatePath(`/admin/guides/${id}/edit`)

    return NextResponse.json({
      success: true
    })

  } catch {

    return NextResponse.json(
      {
        error:
          "Autosave failed"
      },
      {
        status: 500
      }
    )
  }
}