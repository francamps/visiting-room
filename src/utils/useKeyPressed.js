import { useEffect, useState } from "react"

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false)

  function keyHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", keyHandler)
    return () => {
      window.removeEventListener("keyup", keyHandler)
    }
  }, [keyHandler])

  return keyPressed
}

export default useKeyPress
