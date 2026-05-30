"use client"

import { useEffect, useRef, useState } from "react"
import ContextMenuItem from "./ContextMenuItem"

import type { ContextMenuSection } from "@/components/editor/types/contextMenuSection"

type Props = {
  visible: boolean

  position: {
    x: number
    y: number
  }

  actions: ContextMenuSection[]

  onClose: () => void

  onMeasure?: (
    rect: DOMRect
  ) => void
}

export default function ContextMenu({
  visible,
  position,
  actions,
  onClose,
  onMeasure
}: Props) {

  const menuRef = useRef<HTMLDivElement>(null)

  if (!visible) return null

  useEffect(() => {

  if (
    visible &&
    menuRef.current
  ) {
    onMeasure?.(
      menuRef.current.getBoundingClientRect()
    )
  }

}, [visible])

  return (

  <div
    ref={menuRef}
    className="fixed z-50 min-w-60 rounded-2xl border border-zinc-700 bg-zinc-900/95 p-2 shadow-2xl backdrop-blur-xl"

    style={{
      top: position.y,
      left: position.x
    }}
  >

    {actions.map((section) => (

      <div
        key={section.section}
        className="mb-2 border-b border-zinc-800 pb-2 last:mb-0 last:border-none last:pb-0"
      >

        {section.section && (

          <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {section.section}
          </p>
        )}

        <div className="flex flex-col gap-1">

          {section.items.map((item) => (

            <ContextMenuItem
              key={item.label}

              item={item}

              onClose={onClose}
            />

          ))}

        </div>

      </div>
    ))}

  </div>
)
}
