import { prisma } from "@/lib/prisma"
import Image from "next/image"

export default async function GamesPage() {
  const games = await prisma.game.findMany()

  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>
          {game.title}
          <Image
            src={game.image}
            alt={game.title}
            width={300}
            height={200}
            priority
          />
        </div>
      ))}
    </div>
  )
}