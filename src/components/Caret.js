import React from "react"

import "./Caret.css"

const Caret = ({ direction = "down", color = "#ffffff ", animate }) => (
  <svg
    width="18px"
    height="20px"
    viewBox="0 0 18 20"
    className={animate ? "animate" : ""}
  >
    <polygon
      strokeLinejoin="round"
      fillRule="evenodd"
      fill={color}
      stroke={color}
      points="7.4 4 0 8 0 0"
      style={{
        transform: "translate(18px, 0px) rotate(90deg) scale(2)",
      }}
    ></polygon>
  </svg>
)

export default Caret
