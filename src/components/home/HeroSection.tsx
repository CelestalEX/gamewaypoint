export default function HeroSection() {

  return (
    <section
      className="relative h-125 rounded-2xl overflow-hidden bg-zinc-900 text-white"
    >

      <div
        className="
          absolute
          inset-0

          bg-black/50
        "
      />

      <div
        className="
          relative
          z-10

          h-full

          flex
          flex-col
          justify-center

          p-10
        "
      >

        <h1
          className="
            text-6xl
            font-black
            max-w-2xl
          "
        >
          Ultimate Gaming Guides
        </h1>

        <p
          className="
            mt-4
            text-zinc-300
            text-lg
            max-w-xl
          "
        >
          Walkthroughs, builds and boss guides
          for your favorite games.
        </p>

      </div>

    </section>
  )
}