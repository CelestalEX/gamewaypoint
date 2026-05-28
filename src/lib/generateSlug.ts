import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/slugify"

export async function generateSlug(title: string) {
  const baseSlug = slugify(title)

  let slug = baseSlug
  let counter = 1

  while (true) {
    const existing = await prisma.game.findUnique({
      where: { slug }
    })

    if (!existing) {
      break
    }

    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}