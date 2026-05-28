import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function requireAdmin() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== Role.ADMIN) {
    throw new Error("Unauthorized")
  }

  return session
}