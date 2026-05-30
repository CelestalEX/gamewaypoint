"use client"
import { useEffect, useState, useRef } from "react"
import { ChevronRight } from "lucide-react"

import type { ContextMenuItem as ContextMenuItemType } from "@/components/editor/types/contextMenuItem"

import { getSafeSubmenuPosition } from "../../helpers/getSafeSubmenuPosition"

type Props = {
  item: ContextMenuItemType
  onClose: () => void
}

export default function ContextMenuItem({
  item,
  onClose
}: Props) {

  if (item.separator) {
    return (
      <div className="my-1 border-t border-zinc-800" />
    )
  }

  const ItemIcon = item.icon

  const [showSubmenu, setShowSubmenu] = useState<boolean>(false)

  const itemRef = useRef<HTMLDivElement>(null)

  const submenuRef = useRef<HTMLDivElement>(null)

  const [submenuSide, setSubmenuSide] =
    useState<"left" | "right">("right")
  
  const [submenuTop, setSubmenuTop] = useState(0)

  const handleClick = () => {

    if (
      item.disabled ||
      !item.onClick
    ) return

    item.onClick()

    onClose()
  }

  useEffect(() => {

    if(
      !showSubmenu ||
      !itemRef.current ||
      !submenuRef.current
    ){
      return
    }

    const result =
      getSafeSubmenuPosition({
        triggerRect: itemRef.current.getBoundingClientRect(),
        submenuWidth: submenuRef.current.offsetWidth,
        submenuHeight: submenuRef.current.offsetHeight
      })

    setSubmenuSide(
      result.side
    )

    setSubmenuTop(
      result.top
    )

  }, [showSubmenu])


  return (


    <div
      ref={itemRef}
      className="relative"
      onMouseEnter={() => 
        setShowSubmenu(true)
      }

      onMouseLeave={() =>
        setShowSubmenu(false)
      }
    >

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

    {/* LEFT NAME + ICON */}

    <div className="flex items-center gap-2">

      {ItemIcon && (
        
        <span className="flex h-4 w-4 items-center justify-center text-zinc-400">
          <ItemIcon size={16} />
        </span>
      )}

      <span>
        {item.label}
      </span>

    </div>

    {/* RIGHT SHORTCUT */}

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

  {/* SUBMENU FOR INSERT */}
      {
        item.submenu &&
        showSubmenu && (
          <div 
            ref={submenuRef}
            className={`absolute min-w-55 rounded-xl border border-zinc-700 bg-zinc-900 p-1 shadow-2xl
            ${
              submenuSide === "right"
                ? "left-full"
                : "right-full" 
            }
          `}
            style={{
              top: submenuTop
            }}
          >
            {item.submenu.map(
              (subItem) => (
                <ContextMenuItem 
                  key={subItem.label}
                  item={subItem}
                  onClose={onClose}
                />
              )
            )}
          </div>
        )
      }
      
  </div>


)
}
