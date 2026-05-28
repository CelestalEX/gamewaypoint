"use client"

import { ReactNode } from "react"

type Props = {
  icon: ReactNode
  onClick: () => void
  active?: boolean
}

export default function ToolbarButton({
  icon,
  onClick,
  active = false
}: Props) {

  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`
        flex h-8 w-8 items-center justify-center
        rounded-md transition-colors

        ${
          active
            ? "bg-zinc-700 text-white"
            : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
        }
      `}
    >
      {icon}
    </button>
  )
}