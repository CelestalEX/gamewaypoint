import Link from "next/link"

export default function LatestGuides({
  guides
}: any) {

  return (
    <section>

      <h2
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Latest Guides
      </h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {guides.map((guide: any) => (

          <article
            key={guide.id}

            className="
              bg-zinc-900
              rounded-xl
              p-6
            "
          >

            <p className="text-sm text-red-500">
              {guide.game.title}
            </p>

            <h3
              className="
                text-2xl
                font-bold
                mt-2
                text-white
              "
            >
              {guide.title}
            </h3>

            <Link
              href={`/guides/${guide.slug}`}
              className="mt-4 inline-block text-white"
            >
              Read guide →
            </Link>

          </article>

        ))}

      </div>

    </section>
  )
}