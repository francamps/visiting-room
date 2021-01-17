import React, { useState } from "react"

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
    ></button>
  )
}

export default CrossClose
