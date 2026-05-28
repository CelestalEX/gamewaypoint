"use client"

import { useEffect,useState } from "react"

import { usePathname } from "next/navigation"

export default function ReadingProgress() {

  const pathname = usePathname()

  const [progress, setProgress] = useState(0)

  const [visible, setVisible] = useState(false)

  useEffect(() => {

    // tylko guide pages
    if (
      !pathname.startsWith("/guides/")
    ) {
      setVisible(false)
      return
    }

    const updateProgress = () => {

      const article = document.getElementById("guide-content")

      if (!article) return

      const rect = article.getBoundingClientRect()

      const scrollTop = window.scrollY

      const articleTop = scrollTop + rect.top

      const articleHeight = article.offsetHeight

      const windowHeight = window.innerHeight

      // start progress
      const start = articleTop

      // end progress
      const end = articleTop + articleHeight - windowHeight

      // przed contentem
      if (
        scrollTop < start
      ) {

        setVisible(false)
        setProgress(0)

        return
      }

      setVisible(true)

      // po content
      if (
        scrollTop > end
      ) {

        setProgress(100)

        return
      }

      const percent =
        (
          (scrollTop - start) /
          (end - start)
        ) * 100

      setProgress(percent)
    }

    updateProgress()

    window.addEventListener(
      "scroll",
      updateProgress
    )

    window.addEventListener(
      "resize",
      updateProgress
    )

    return () => {

      window.removeEventListener(
        "scroll",
        updateProgress
      )

      window.removeEventListener(
        "resize",
        updateProgress
      )
    }

  }, [pathname])

  if (!visible) {
    return null
  }

  return (

    <div className="fixed top-0 left-0 z-9999 h-1 w-full">

      <div className="h-full bg-linear-to-r from-blue-500 to-cyan-400 transition-all duration-150"

        style={{
          width: `${progress}%`
        }}
      />

    </div>
  )
}