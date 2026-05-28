import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

import GameHero from '@/components/game/GameHero'
import GuidesSection from '@/components/game/GuidesSection'

type Props = {
    params: Promise<{
        slug: string
    }>
}

export default async function GamePage({ params }: Props) {

    const { slug } = await params;
    const game = await prisma.game.findUnique({
        where: {
            slug
        },
        

        include: {
          guides:{
            where:{
              published: true
            },

            orderBy: {
                id: "desc"
            }
          }
        },
    })



    if (!game){
        return(
            <div>
                Game not found
            </div>
        )
    }

    return(
        <main className='space-y-12 overflow-x-hidden'>
            <GameHero game={game} />
            <GuidesSection guides={game.guides} />
        </main>
    )
}

export async function generateMetadata({
    params
}: Props): Promise<Metadata>{
    const { slug } = await params

    const game = await prisma.game.findUnique({
        where:{
            slug
        }
    })

    return{
        title: game?.title,
        description: game?.description
    }
}