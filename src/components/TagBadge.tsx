import Link from "next/link"

const tagVariants: Record<string, string> = {

  walkthrough:`
    bg-green-500/20
    border-green-500
    text-green-600
  `,

  beginner:`
    bg-lime-500/20
    border-lime-500
    text-lime-600
  `,

  boss:`
    bg-red-500/20
    border-red-500
    text-red-600
  `,

  weapons:`
    bg-gray-500/20
    border-gray-500
    text-gray-600
  `,

  build:`
    bg-yellow-500/20
    border-yellow-500
    text-yellow-600
  `,

  secrets:`
    bg-orange-500/20
    border-orange-500
    text-orange-600
  `,

  pve:`
    bg-fuchsia-500/20
    border-fuchsia-500
    text-fuchsia-600
  `,

  pvp:`
    bg-purple-500/20
    border-purple-500
    text-purple-600
  `,

  achievements:`
    bg-green-500/20
    border-green-500
    text-green-600
  `,

  neutral:`
    bg-zinc-800
    border-zinc-700
    text-zinc-200
  `
}



export default function TagBadge({
  tag
}: any) {

  const variant =
    tagVariants[tag.variant] ||
    tagVariants.neutral


  return (
    <Link
      href={`/tags/${tag.slug}`}

      className={`
        px-3
        py-1

        rounded-full
        text-sm
        font-medium

        border

        transition
        hover:scale-105

        ${variant}
      `}
    >
      {tag.name}
    </Link>
  )
}