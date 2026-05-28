"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

export default function SearchBar() {

  const [query, setQuery] = useState("")

  const [results, setResults] = useState({guides: [], games: []})

  const [loading, setLoading] = useState(false)

  const clearSearch = () => {
    setQuery("")
    setResults({guides: [], games: []})
  }

  useEffect(() => {

    if (!query) {
      setResults({guides: [], games: []})
      return
    }

    const timeout =
      setTimeout(async () => {

        setLoading(true)

        const res =
          await fetch(
            `/api/search?q=${query}`
          )

        if(!res.ok){
            return
        }

        const data = await res.json()

        setResults(data)

        setLoading(false)

      }, 300)

    return () => clearTimeout(timeout)

  }, [query])

  return (
    <div className="relative">

      <input
        type="text"
        placeholder="Search guides..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className=" bg-zinc-800 px-4 py-2 rounded-lg w-80 text-white"/>

      {loading && (
        <p className="mt-2 text-white">
          Searching...
        </p>
      )}

      {results.guides.length > 0 && (

        <div className="absolute top-14 left-0 w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-50 text-white">
          
          {results.guides.length > 0 && (
            <div>
              <p className="px-4 py-2 text-xs text-zinc-500">
                Guides
              </p>
            </div>
          )}

          {results.guides.map((guide: any) => (

            <Link
              key={guide.id}
              href={`/guides/${guide.slug}`}
              onClick={clearSearch}
              className="block p-4 hover:bg-zinc-800">

              <p className="text-sm text-red-500">
                {guide.game.title}
              </p>

              <h3>
                {guide.title}
              </h3>

            </Link>

          ))}

        </div>

      )}

      {results.games.length > 0 && (
        <div className="absolute top-14 left-0 w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-50 text-white">
            <p className="px-4 py-2 text-xs text-zinc-500 bg-zinc-900">
                Games
            </p>

            {results.games.map((game: any) => (

                <Link
                  key={game.id}
                  href={`/games/${game.slug}`}
                  onClick={clearSearch}
                  className="block p-4 hover:bg-zinc-800 bg-zinc-900 text-white">
                    🎮 {game.title}
                </Link>
            ))}
        </div>
      )}

      {query && !loading && results.guides.length === 0 && results.games.length === 0 && (
        <div className="absolute top-14 left-0 w-full bg-zinc-900 p-4 rounded-xl text-white z-50">
            Searching or No results
        </div>
      )}

    </div>
  )
}