import { useState, useEffect } from "react"
import throttle from "lodash/throttle"

function useDocumentScrollThrottled(callback, throttleTime = 100) {
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
    const handleDocumentScrollThrottled = throttle(
      handleDocumentScroll,
      throttleTime
    )
    window.addEventListener("scroll", handleDocumentScrollThrottled)

    return () =>
      window.removeEventListener("scroll", handleDocumentScrollThrottled)
  }, [])
}

export default useDocumentScrollThrottled
