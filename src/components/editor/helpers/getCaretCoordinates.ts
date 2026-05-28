export const getCaretCoordinates = (
    textarea: HTMLTextAreaElement,
    position: number
  ) => {
    const div = document.createElement("div")
    const style = window.getComputedStyle(textarea)
    for (const prop of style){
      div.style.setProperty(
        prop,
        style.getPropertyValue(prop)
      )
    }

    div.style.position = "fixed"
    div.style.visibility = "hidden"
    div.style.whiteSpace = "pre-wrap"
    div.style.wordWrap = "break-word"
    div.style.overflowWrap = "break-word"
    div.style.pointerEvents = "none"
    div.style.width = `${textarea.clientWidth}px`
    div.style.height = `${textarea.clientHeight}px`
    div.scrollTop = textarea.scrollTop
    div.style.overflow = "hidden"

    div.scrollTop = textarea.scrollTop

    div.textContent = textarea.value.substring(0, position)

    const span = document.createElement("span")

    span.textContent = "|"

    div.appendChild(span)

    document.body.appendChild(div)

    const rect = span.getBoundingClientRect()
    document.body.removeChild(div)

    return {
      top: rect.top,
      left: rect.left
    }
  }