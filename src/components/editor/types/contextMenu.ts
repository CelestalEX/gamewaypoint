export type ContextAction = {
  label: string
  action: () => void
}

export type ContextSection = {
  section: string
  items: ContextAction[]
}