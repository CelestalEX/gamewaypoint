"use client"

import Link from "next/link"
import {signOut, useSession } from "next-auth/react"
import SearchBar from "../SearchBar"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header
      className="border-b border-zinc-800 bg-zinc-900"
    >

      <div
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >

        <Link
          href="/"
          className="text-2xl font-bold text-red-500"
        >
          Gaming Guides
        </Link>
        
        <div className="flex items-center gap-6">
          <SearchBar />
        </div>

        <nav className="flex gap-6 text-red-500">

          <Link href="/games">
            Games
          </Link>

          <Link href="/guides">
            Guides
          </Link>


          {session?.user?.role === "ADMIN" && (
            <Link href="/admin">
              Admin
            </Link>
          )}

          {session ? (
            <>
              <span className="text-sm text-zinc-400">
                {session.user.email}
              </span>

              <button onClick={() => signOut({callbackUrl: "/"})}>
                Logout
              </button>
            </>
          ): (
            <Link href="/login">
                Login
            </Link>
          )}

        </nav>

      </div>

    </header>
  )
}