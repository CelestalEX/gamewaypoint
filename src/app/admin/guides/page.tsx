import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function AdminGuidesPage() {

  const guides = await prisma.guide.findMany({
    include: {
      game: true
    },

    orderBy: {
      id: "desc"
    }
  })

  return (
    <main>

      <div
        className="
          flex
          items-center
          justify-between
          mb-8
        "
      >

        <h1 className="text-4xl font-bold">
          Guides
        </h1>

        <Link
          href="/admin/guides/new"
          className="
            bg-red-400
            px-4
            py-2
            rounded-lg
            ml-2
          "
        >
          New Guide
        </Link>

      </div>

      <div className="space-y-4">

        {guides.map((guide) => (

          <article
            key={guide.id}

            className="
              bg-zinc-900
              text-white
              p-6
              rounded-xl

              flex
              items-center
              justify-between
            "
          >

            <div>

              <p className="text-zinc-400">
                {guide.game.title}
              </p>

              <h2 className="text-2xl font-bold">
                {guide.title}
              </h2>

              <p>
                {guide.published
                  ? "Published"
                  : "Draft"}
              </p>

            </div>

            <div className="flex gap-4">

              <Link
                href={`/admin/guides/${guide.id}/edit`}
              >
                Edit
              </Link>

            </div>

          </article>

        ))}

      </div>

    </main>
  )
}