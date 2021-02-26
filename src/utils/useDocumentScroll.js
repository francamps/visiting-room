import React, { useState, useEffect } from "react"
import throttle from "lodash/throttle"

function useDocumentScrollThrottled(callback, deps) {
  const [, setScrollPosition] = useState(0)
  let previousScrollTop = 0

  function handleDocumentScroll() {
    const { scrollTop: currentScrollTop } =
      document.documentElement || document.body

    setScrollPosition(previousPosition => {
      previousScrollTop = previousPosition
      return currentScrollTop
    })

    callback({ previousScrollTop, currentScrollTop })
  }

  const handleDocumentScrollThrottled = throttle(handleDocumentScroll, 100)

  useEffect(() => {
    window.addEventListener("scroll", handleDocumentScrollThrottled)

    return () =>
      window.removeEventListener("scroll", handleDocumentScrollThrottled)
  }, [])
}

export default useDocumentScrollThrottled
