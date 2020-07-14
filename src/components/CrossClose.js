import React from "react"

import "./CrossClose.css"

const CrossClose = ({ onClick, primary }) => {
  return (
    <button
      className={`close ${primary && "primary"}`}
      onClick={onClick}
    ></button>
  )
}

export default CrossClose
