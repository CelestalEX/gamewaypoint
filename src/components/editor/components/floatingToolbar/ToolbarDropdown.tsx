"use client"

import {
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react"

import { ChevronDown } from "lucide-react"

type Item = {
  label: string
  onClick: () => void
}

type Props = {
  label: string
  icon?: ReactNode
  items: Item[]
}

export default function ToolbarDropdown({
  label,
  icon,
  items
}: Props) {

  const [open, setOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const handleClickOutside = (
      e: MouseEvent
    ) => {

      if (
        ref.current &&
        !ref.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false)
      }
    }

    window.addEventListener(
      "click",
      handleClickOutside
    )

    return () =>
      window.removeEventListener(
        "click",
        handleClickOutside
      )

  }, [])

  return (
    <div
      ref={ref}
      className="relative"
    >

      {/* TRIGGER */}

      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="
          flex h-8 items-center gap-1
          rounded-md px-2

          text-sm text-zinc-300

          transition-colors

          hover:bg-zinc-800
          hover:text-white
        "
      >

        {icon}

        <span>{label}</span>

        <ChevronDown size={14} />

      </button>

      {/* MENU */}

      {
        open && (
          <div
            className="
              absolute left-0 top-10
              z-50

              min-w-45

              rounded-xl
              border border-zinc-700
              bg-zinc-900

              p-1

              shadow-2xl
            "
          >

            {
              items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    item.onClick()
                    setOpen(false)
                  }}
                  className="
                    flex w-full items-center
                    rounded-lg
                    px-3 py-2

                    text-left text-sm
                    text-zinc-300

                    transition-colors

                    hover:bg-zinc-800
                    hover:text-white
                  "
                >
                  {item.label}
                </button>
              ))
            }

          </div>
        )
      }

    </div>
  )
}