import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

import { commentSchema } from "@/lib/validators/comment"
import { sanitize } from "@/lib/sanitize"
import { rateLimit } from "@/lib/rateLimit"

export async function POST(req: Request) {
  try {
    // 🔹 rate limit
    const ip = req.headers.get("x-forwarded-for") || "unknown"

    const allowed = rateLimit(ip)

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      )
    }

    // 🔹 parse body
    const body = await req.json()

    // 🔹 validate
    const parsed = commentSchema.safeParse(body)

    if (!parsed.success) {
        const errors = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
        }))
        return NextResponse.json(
            { errors },
            { status: 400 }
      )
    }

    const { content, guideId, authorName } = parsed.data

    // 🔹 sanitize
    const safeContent = sanitize(content)
    const safeName = authorName ? sanitize(authorName) : undefined

    // 🔹 session
    const session = await getServerSession(authOptions)

    // 🔹 create comment
    const comment = await prisma.comment.create({
      data: {
        content: safeContent,

        guide: {
          connect: { id: guideId }
        },

        ...(session
          ? {
              author: {
                connect: {
                  id: Number(session.user.id)
                }
              }
            }
          : {
              authorName: safeName || "Anonymous"
            })
      }
    })

    return NextResponse.json(comment)

  } catch (error) {
    console.error("COMMENT ERROR:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const guideId = searchParams.get("guideId")

    if (!guideId) {
      return NextResponse.json(
        { error: "guideId required" },
        { status: 400 }
      )
    }

    const comments = await prisma.comment.findMany({
      where: {
        guideId: Number(guideId)
      },
      include: {
        author: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(comments)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}