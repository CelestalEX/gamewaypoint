import Link from "next/link"

export default function GuidesSection({
  guides
}: any) {

  return (
    <section>

      <h2
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Guides
      </h2>

      <div className="grid gap-6">

        {guides.map((guide: any) => (

          <article
            key={guide.id}

            className="
              bg-zinc-900
              rounded-xl
              p-6

              hover:bg-zinc-800
              transition
            "
          >

            <h3
              className="
                text-2xl
                font-bold
                text-white
              "
            >
              {guide.title}
            </h3>

            <Link
              href={`/guides/${guide.slug}`}

              className="
                mt-4
                inline-block
                text-red-500
              "
            >
              Read guide →
            </Link>

            {guides.length === 0 && (
                <p>
                No guides yet.
                </p>
            )}

          </article>

        ))}

      </div>

    </section>
  )
}