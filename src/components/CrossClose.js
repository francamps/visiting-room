import React, { useState } from "react"

import "./CrossClose.css"

const CrossClose = ({ onClick }) => {
  const [isHover, setHover] = useState(false)

  return (
    <button
      className={`close ${isHover && "primary"}`}
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
