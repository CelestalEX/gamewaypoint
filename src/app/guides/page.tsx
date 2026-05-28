import { prisma } from "@/lib/prisma"

export default async function GuidePage() {
    const guides = await prisma.guide.findMany()
    
    return (
        <div>
            {guides.map((guide) => (
                <div key={guide.id}>
                    {guide.title}
                </div>
            ))}
        </div>
    )
}