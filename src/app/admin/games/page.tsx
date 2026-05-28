import { prisma } from "@/lib/prisma"
import DeleteGameButton from "@/components/DeleteGameButton"

export default async function AdminGamesPage() {
  const games = await prisma.game.findMany({
    orderBy: {
      id: "desc"
    }
  })

  return (
    <div>
      <h1>Games</h1>

      {games.map((game) => (
        <div
          key={game.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10
          }}
        >
          <h2>{game.title}</h2>

          <p>{game.genre}</p>

          <DeleteGameButton id={game.id} />
        </div>
      ))}
    </div>
  )
}