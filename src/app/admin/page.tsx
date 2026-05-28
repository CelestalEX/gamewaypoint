import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }
  

  return (
    <div>
      Admin Dashboard<br />
      <Link href={"/admin/guides"}>
        Guides
      </Link>
    </div>
  )
}