import { prisma } from "@/lib/prisma"

import NewGuideForm from "@/components/NewGuideForm"

export default async function NewGuidePage() {

  const games = await prisma.game.findMany({
      orderBy: {
        title: "asc"
      }
    })

  const tags = await prisma.tag.findMany({
      orderBy: {
        name: "asc"
      }
    })
  const guides = await prisma.guide.findMany({
    
  })

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black">
          Create Guide
        </h1>

        <p className="text-zinc-400 mt-2">
          Publish a new gaming guide
        </p>

      </div>

      <NewGuideForm
        games={games}
        tags={tags}
      />

    </div>
  )
}