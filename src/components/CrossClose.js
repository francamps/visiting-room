import React from "react"

import "./CrossClose.css"

const CrossClose = ({ onClick }) => {
  return <button ariaLabel="Close" className="close" onClick={onClick}></button>
}

export default CrossClose
