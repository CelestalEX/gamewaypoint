"use client"

import Image from "next/image"

import { useState } from "react"

type Props = {
  src: string
  alt?: string
}

export default function LightboxImage({
  src,
  alt
}: Props) {

  const [open, setOpen] = useState(false)

  return (

    <figure>
      {/* PREVIEW */}
      <figure
        className="
          my-8
          overflow-hidden
          rounded-2xl
          border
          border-zinc-800
          cursor-zoom-in
        "

        onClick={() =>
          setOpen(true)
        }
      >

        <Image
          src={src}
          alt={alt || ""}

          width={1600}
          height={900}

          className="
            w-full
            h-auto
            transition
            hover:scale-[1.01]
          "
        />

      </figure>

      {/* MODAL */}
      {open && (

        <figure
          className="
            fixed
            inset-0
            z-99999
            bg-black/90
            flex
            items-center
            justify-center
            p-8
          "

          onClick={() =>
            setOpen(false)
          }
        >

          <figure
            className="
              relative
              max-w-7xl
              w-full
            "
          >

            <Image
              src={src}
              alt={alt || ""}
              width={2400}
              height={1400}
              className="
                w-full
                h-auto
                rounded-2xl
              "
            />

            {alt && (

              <p
                className="
                  mt-4
                  text-center
                  text-zinc-300
                "
              >
                {alt}
              </p>
            )}

          </figure>

        </figure>
      )}
    </figure>
  )
}