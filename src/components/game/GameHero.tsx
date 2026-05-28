import Image from "next/image"

export default function GameHero({
  game
}: any) {

  return (
    <section
      className="
        relative
        h-125
        rounded-2xl
        overflow-hidden
        text-white
      "
    >

      {game.image && (

        <Image
          src={game.image}
          alt={game.title}

          fill

          priority

          className="
            object-cover
          "
        />

      )}

      <div
        className="
          absolute
          inset-0

          bg-black/70
        "
      />

      <div
        className="
          absolute
          inset-0

          flex
          flex-col
          justify-end

          p-10
        "
      >

        <p
          className="
            text-red-500
            font-bold
            mb-2
          "
        >
          {game.genre}
        </p>

        <h1
          className="
            text-6xl
            font-black
          "
        >
          {game.title}
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-zinc-300
            text-lg
          "
        >
          {game.description}
        </p>

      </div>

    </section>
  )
}