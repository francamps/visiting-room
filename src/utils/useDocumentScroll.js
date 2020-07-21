import React, { useState, useEffect } from "react"
import throttle from "lodash/throttle"

function useDocumentScrollThrottled(element, callback, deps) {
  const [, setScrollPosition] = useState(0)
  let previousScrollTop = 0

  function handleDocumentScroll() {
    const currentScrollTop =
      element.getBoundingClientRect().top -
      element.firstElementChild.getBoundingClientRect().top

    setScrollPosition(previousPosition => {
      previousScrollTop = previousPosition
      return currentScrollTop
    })

    callback({ previousScrollTop, currentScrollTop })
  }

  const handleDocumentScrollThrottled = throttle(handleDocumentScroll, 100)

  useEffect(() => {
    if (element)
      element.addEventListener("scroll", handleDocumentScrollThrottled)

    return () =>
      element &&
      element.removeEventListener("scroll", handleDocumentScrollThrottled)
  }, deps)
}

export default useDocumentScrollThrottled
