"use client"

import { Heading } from "@/lib/extractHeading"

import { useEffect, useState } from "react"

type Props = {
  headings: Heading[]
}

export default function GuideTOC({
  headings
}: Props) {

    const [activeId, setActiveId] = useState("")

    useEffect(() => {
        const headings = document.querySelectorAll("h1, h2, h3")

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (
                        entry.isIntersecting
                    ){
                        setActiveId(
                            entry.target.id
                        )
                    }
                })
            },
            {
                rootMargin: "-20% 0px -70% 0px"
            }
        )

        headings.forEach((heading) => {
            observer.observe(heading)
        })

        return () => {
            observer.disconnect()
        }

    }, [])



  return (

    <nav className="sticky top-24">

      <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
        On this page
      </h2>

      <ul className="space-y-3">

        {headings.map((heading) => (

          <li
            key={heading.id}

            className={
              heading.level === 2
                ? ""
                : "ml-4"
            }
          >

            <a
              href={`#${heading.id}`}

              className={`block text-sm transition hover:text-blue-500 ${activeId === heading.id ? "text-blue-500 font-bold" : "text-zinc-400"}`}
            >
              {heading.text}
            </a>

          </li>
        ))}

      </ul>

    </nav>
  )
}