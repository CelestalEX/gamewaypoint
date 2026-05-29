"use client"

import { ChevronRight } from "lucide-react"

import type { ContextMenuItem as ContextMenuItemType } from "@/components/editor/types/contextMenuItem"

type Props = {
  item: ContextMenuItemType
  onClose: () => void
}

export default function ContextMenuItem({
  item,
  onClose
}: Props) {

  const handleClick = () => {

    if (
      item.disabled ||
      !item.onClick
    ) return

    item.onClick()

    onClose()
  }

  return (


    <button
      type="button"

      disabled={item.disabled}

      onClick={handleClick}

      className={`
        group
        flex
        w-full
        items-center
        justify-between
        rounded-lg
        px-3
        py-2
        text-sm
        transition-colors
        ${
          item.disabled
            ? "cursor-not-allowed opacity-40"
            : item.danger
              ? "text-red-400 hover:bg-red-500/10"
              : "text-zinc-200 hover:bg-zinc-600"
        }
       `}
    >

    {/* LEFT */}

    <div className="flex items-center gap-2">

      {item.icon && (
        <span className="text-zinc-400">
          {item.icon}
        </span>
      )}

      <span>
        {item.label}
      </span>

    </div>

    {/* RIGHT */}

    <div className="flex items-center gap-3">

      {item.shortcut && (

        <span className="text-xs text-zinc-500">
          {item.shortcut}
        </span>
        
      )}

      {item.submenu && (

        <ChevronRight
          size={14}
          className="
          text-zinc-500
          "
        />
      )}

    </div>

</button>


)
}
