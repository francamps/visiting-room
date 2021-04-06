import { useState, useEffect } from "react"
import throttle from "lodash/throttle"

function useDocumentScrollThrottled(callback) {
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

  useEffect(() => {
    const handleDocumentScrollThrottled = throttle(handleDocumentScroll, 100)
    window.addEventListener("scroll", handleDocumentScrollThrottled)

    return () =>
      window.removeEventListener("scroll", handleDocumentScrollThrottled)
  }, [])
}

export default useDocumentScrollThrottled
