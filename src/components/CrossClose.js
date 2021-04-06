import React, { useState } from "react"

import { handleKeyUp } from "../utils"

import "./CrossClose.css"

const CrossClose = ({ onClick, theme }) => {
  const [isHover, setHover] = useState(false)

  return (
    <button
      className={`close ${
        isHover && theme !== "light" ? "primary" : isHover ? "hover" : ""
      } ${theme === "light" ? "light" : ""}`}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      onClick={onClick}
      onKeyUp={ev => handleKeyUp(ev, onClick)}
      aria-label="Close"
    ></button>
  )
}

export default CrossClose
