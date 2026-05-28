import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const session = await getServerSession(authOptions)

export const { handlers, auth } = NextAuth({
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ]
})