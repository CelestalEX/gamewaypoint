import { prisma } from "@/lib/prisma"

import EditGuideForm from "@/components/editor/EditGuideForm"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditGuidePage({
  params
}: Props) {
  

  const { id } = await params

  const tags = await prisma.tag.findMany()

  const guide = await prisma.guide.findUnique({

    where: {
      id: Number(id)
    },

    include: {
      tags: true
    }
  })


  if (!guide) {
    return <div>Guide not found</div>
  }

  return (
    <EditGuideForm guide={guide} tags={tags}/>
  )
}