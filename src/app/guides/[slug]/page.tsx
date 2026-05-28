import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"

import CommentForm from "@/components/CommentForm"
import CommentList from "@/components/CommentList"
import TagBadge from "@/components/TagBadge"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import GuideTOC from "@/components/GuideTOC"
import { extractHeadings } from "@/lib/extractHeading"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function GuidePage({ params }: Props) {
  // 🔹 Next.js 15 — params jest Promise
  const { slug } = await params


  // 🔹 pobranie poradnika + komentarzy
  const guide = await prisma.guide.findUnique({
    where: {
      slug
    },
    include: {
      game: true,
      tags: true,

      comments: {
        include: {
          author: true
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  })

  //  jeśli nie istnieje

  if (!guide) {
    notFound()
  }

  const headings = extractHeadings(guide.content)

  const sameGameGuides = await prisma.guide.findMany({
      where: {
        published: true,

        id: {
          not: guide?.id
        },

        gameId: guide?.gameId
      },

      include: {
        game: true
      },

      take: 3
    })

  const tagGuides = await prisma.guide.findMany({
    where: {
      published: true,

      id: {
        notIn: [
          guide.id,
          ...sameGameGuides.map(
            (g) => g.id
          )
        ]
      },

      tags: {
        some: {
          id: {
            in: guide.tags.map(
              (tag) => tag.id
            )
          }
        }
      }
    },

    include: {
      game: true
    },

    take: 3
  })

  const relatedGuides = [...sameGameGuides, ...tagGuides]

  return (
    <div className="min-h-screen bg-white text-black max-w-400 mx-auto px-8 py-auto">
      <h1>{guide.title}</h1>

      <div className="flex gap-2">

    {guide.tags.map((tag) => (

      <TagBadge tag={tag} key={tag.id}/>

      ))}

      </div>
      <hr style={{margin: "20px 0"}}/>

      <div className="grid grid-cols-12 gap-8">

        <article id="guide-content" className="col-span-12 lg:col-span-9 min-w-0 prose prose-invert max-w-none">

        <MarkdownRenderer
          content={guide.content}
        />

        </article>

        <aside className="col-span-3 hidden lg:block sticky top-24 self-start text-right">

          <GuideTOC
            headings={headings}
          />

        </aside>

      </div>

      <section className="mt-16">
        <h2 className="text-3x1 font-bold mb-6">
          Related Guides
        </h2>
        <div className="grid gap-6 grid-cols-3">
          {relatedGuides.map((related) => (
            <article key={related.id} className="bg-white p-6 rounded-x1 hover:bg-gray-500/20 transition border border-zinc-900">
                <p className="text-blue-500 text-sm font-bold">
                  {related.game.title}
                </p>
                <h3 className="text-x1 font-bold mt-2">
                  {related.title}
                </h3>
                <Link href={`/guides/${related.slug}`} className="inline-block mt-4 text-blue-500">
                  Read guide →
                </Link>
            </article>
          ))}
        </div>
      </section>

      <hr style={{ margin: "40px 0" }} />

      <CommentForm guideId={guide.id} />

      <CommentList guideId={guide.id} />
    </div>
  )
}