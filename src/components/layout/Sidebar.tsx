import Link from "next/link"

export default function Sidebar() {

  return (
    <aside className="hidden lg:block w-64 min-h-screen border-l border-zinc-800 p-6">

      <h2 className="text-lg font-bold mb-4">
        Categories
      </h2>

      <nav className="flex flex-col gap-3">

        <Link href="/games/elden-ring">
          Elden Ring
        </Link>

        <Link href="/games/dark-souls">
          Dark Souls
        </Link>

      </nav>

    </aside>
  )
}