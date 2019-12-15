import React from "react"

const Caret = ({ direction = "down", color = "#ffffff ", animate }) => {
  return (
    <svg
      width="9px"
      height="10px"
      viewBox="0 0 9 10"
      className={animate ? "animate" : ""}
    >
      <polygon
        strokeLinejoin="round"
        fillRule="evenodd"
        fill={color}
        stroke={color}
        opacity="0.7"
        points="7.4 4 0 8 0 0"
        style={{
          transform:
            direction === "up"
              ? `translate(0px, 9px) rotate(-90deg)`
              : `translate(9px, 0px) rotate(90deg)`,
        }}
      ></polygon>
    </svg>
  )
}

export default Caret
