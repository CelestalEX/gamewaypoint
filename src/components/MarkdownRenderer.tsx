import React from "react"

import ReactMarkdown from "react-markdown"

import remarkGfm from "remark-gfm"

import rehypeHighlight from "rehype-highlight"

import "highlight.js/styles/github-dark.css"

import type { Components } from "react-markdown"

import { headingSlug } from "@/lib/headingSlug"

import LightboxImage from "./LightboxImage"



type Props = {
  content: string
}

export default function MarkdownRenderer({
  content
}: Props) {

  const components: Components = {

    a ({ href, children}) {
      
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-400 underline"
        >
          {children}
        </a>
      )

    },

    p ({children}){
      const childArray = React.Children.toArray(children)
      const hasImage = 
        childArray.some(
          (child: any) =>
            child?.type === "img"
        )

      if(hasImage){
        return <figure>{children}</figure>
      }

      return <p>{children}</p>
    },


    h1({ children }) {

    const text =
      React.Children
        .toArray(children)
        .join("")

    const id =
      headingSlug(text)

    return (
      <h1 id={id} className="group scroll-mt-32 flex items-center gap-2">
        <span>
          {children}
        </span>
        <a href={`#${id}`} className="opacity-0 transition group-hover:opacity-100 text-zinc-500 text-lg">
          #
        </a>
      </h1>
    )
    },

    h2({ children }) {

      const text =
        React.Children
          .toArray(children)
          .join("")

      const id =
        headingSlug(text)

      return (
        <h2 id={id} className="group scroll-mt-32 flex items-center gap-2">
          <span>
            {children}
          </span>
          <a href={`#${id}`} className="opacity-0 transition group-hover:opacity-100 text-zinc-500 text-lg">
            #
          </a>
        </h2>
      )
    },

    h3({ children }) {

      const text =
        React.Children
          .toArray(children)
          .join("")

      const id =
        headingSlug(text)

      return (
        <h3 id={id} className="group scroll-mt-32 flex items-center gap-2">
          <span>
            {children}
          </span>
          <a href={`#${id}`} className="opacity-0 transition group-hover:opacity-100 text-zinc-500 text-lg">
            #
          </a>
        </h3>
      )
    },

  img(props){
    if(!props.src || typeof props.src !== "string"){
      return null
    }

    return(
      <LightboxImage 
        src={
          typeof props.src === "string"
            ? props.src
            : ""
        }
        alt={props.alt}
      />
    )
  },

      blockquote({ children }) {

        const extractText = (
          nodes: any
        ): string => {

          return React.Children
            .toArray(nodes)

            .map((node: any) => {

              if (
                typeof node === "string"
              ) {
                return node
              }

              if (
                node?.props?.children
              ) {

                return extractText(
                  node.props.children
                )
              }

              return ""
            })

            .join("")
        }

    const fullText =
      extractText(children)

    const isWarning =
      fullText.includes("[!WARNING]")

    const isTip =
      fullText.includes("[!TIP]")

    const isSpoiler =
      fullText.includes("[!SPOILER]")

    const cleanedChildren =
      React.Children.map(
        children,
        (child: any) => {

          if (
            !child?.props?.children
          ) {
            return child
          }

        const cleaned =
          React.Children.map(
            child.props.children,
            (nested: any) => {

              if (
                typeof nested === "string"
              ) {

                return nested
                  .replace(
                    "[!WARNING]",
                    ""
                  )
                  .replace(
                    "[!TIP]",
                    ""
                  )
                  .replace(
                    "[!SPOILER]",
                    ""
                  )
              }

              return nested
            }
          )

        return React.cloneElement(
          child,
          {
            ...child.props,
            children: cleaned
          }
        )
      }
    )

  // WARNING
  if (isWarning) {

    return (

      <div className="my-6 rounded-xl border border-red-500 bg-red-500/10 p-4">
        <div>
          {cleanedChildren}
        </div>
      </div>
    )
  }

  // TIP
  if (isTip) {

    return (

      <div className="my-6 rounded-xl border border-green-500 bg-green-500/10 p-4">
        <div>
          {cleanedChildren}
        </div>
      </div>
    )
  }

  // SPOILER
  if (isSpoiler) {

    return (

      <details
        className="
          my-6

          rounded-xl

          border
          border-yellow-500

          bg-yellow-500/10

          p-4
        "
      >

        <summary
          className="
            cursor-pointer

            font-bold
            text-yellow-300
          "
        >
          Spoiler
        </summary>

        <div className="mt-4">
          {cleanedChildren}
        </div>

      </details>
    )
  }

  return (
    <blockquote>
      {children}
    </blockquote>
  )
  }
  
  }

  return (

    <article id="guide-content" className="prose prose-invert max-w-none break-word overflow-hidden">

      <ReactMarkdown

        remarkPlugins={[
          remarkGfm
        ]}

        rehypePlugins={[
          rehypeHighlight
        ]}

        components={components}
      
      >

        {content}

      </ReactMarkdown>

    </article>
  )
}