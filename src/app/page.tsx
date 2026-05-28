import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

import HeroSection from "@/components/home/HeroSection"
import LatestGuides from "@/components/home/LatestGuides"
import GamesSection from "@/components/home/GamesSection"

export default async function HomePage() {

  const latestGuides = await prisma.guide.findMany({
    where:{
      published: true
    },
    take: 5,

    orderBy:{
      id: "desc"
    },

    include: {
      game: true
    }
  })

  const games = await prisma.game.findMany({
    take:6
  })

  return(
    <div className="space-y-16">

      <HeroSection />

      <LatestGuides guides={latestGuides} />

      <GamesSection games={games} />

    </div>
  )
}