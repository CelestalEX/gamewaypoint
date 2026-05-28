import Image from "next/image"
import Link from "next/link"

export default function GamesSection({
  games
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
        Popular Games
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {games.map((game: any) => (

          <Link
            key={game.id}
            href={`/games/${game.slug}`}
          >

            <article
              className="
                bg-zinc-900
                rounded-xl
                overflow-hidden

                hover:scale-[1.02]
                transition
              "
            >

              {game.image && (

                <Image
                  src={game.image}
                  alt={game.title}
                  width={500}
                  height={300}

                  className="
                    w-full
                    h-52
                    object-cover
                  "
                />

              )}

              <div className="p-4">

                <h3
                  className="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  {game.title}
                </h3>

                <p className="text-zinc-400">
                  {game.genre}
                </p>

              </div>

            </article>

          </Link>

        ))}

      </div>

    </section>
  )
}