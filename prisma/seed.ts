import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.guide.create({
    data: {
      title: "Elden Ring Guide",
      content: "This is a test guide",
      slug: "elden-ring",

      game: {
        create: {
          title: "Elden Ring",
          slug: "elden-ring"
        }
      },

      author: {
        create: {
          email: "admin@test.com",
          password: "123",
          name: "Admin"
        }
      }
    }
  })
}
   

main()