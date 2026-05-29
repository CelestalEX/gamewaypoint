import { ReactNode } from "react"

export type ContextMenuItem = {
  label: string
  icon?: ReactNode
  shortcut?: string

  danger?: boolean
  disabled?: boolean

  onClick?: () => void

  submenu?: ContextMenuItem[]

  separator?: boolean
}