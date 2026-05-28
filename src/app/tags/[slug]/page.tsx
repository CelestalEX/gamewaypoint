import { prisma } from "@/lib/prisma"

import Link from "next/link"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function TagPage({
  params
}: Props) {

  const { slug } = await params

  const tag = await prisma.tag.findUnique({

    where: {
      slug
    },

    include: {

      guides: {

        where: {
          published: true
        },

        include: {
          game: true
        },

        orderBy: {
          id: "desc"
        }
      }
    }
  })

  if (!tag) {

    return (
      <div>
        Tag not found
      </div>
    )
  }

  return (
    <div className="space-y-8">

      <header>

        <p className="text-zinc-400">
          Tag
        </p>

        <h1
          className="text-5xl font-black">
          #{tag.name}
        </h1>

        <p className="mt-2 text-zinc-500">
          {tag.guides.length} guides
        </p>

      </header>

      <section className="grid gap-6">

        {tag.guides.map((guide) => (

          <article
            key={guide.id}

            className=" bg-zinc-900 rounded-xl p-6 hover:bg-zinc-800 transition">

            <p className="text-red-500 text-sm">
              {guide.game.title}
            </p>

            <h2
              className="text-2xl font-bold mt-2">
              {guide.title}
            </h2>

            <Link
              href={`/guides/${guide.slug}`}

              className="inline-block mt-4 text-red-500">
              Read guide →
            </Link>

          </article>

        ))}

      </section>

    </div>
  )
}