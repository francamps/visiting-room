import React, { useState } from "react"

const IconSearch = ({ theme }) => {
  const [isHover, setHover] = useState(false)

  const color = theme === "light" ? "var(--clr-dark-grey)" : "var(--clr-white)"

  return (
    <svg
      width="23px"
      height="22px"
      viewBox="0 0 23 22"
      style={{ opacity: isHover ? 1 : 0.8, transition: "opacity 0.4s" }}
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseOut={() => {
        setHover(false)
      }}
    >
      <g
        id="Typography---UI-Comp"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinejoin="round"
      >
        <g id="Notes-Copy" transform="translate(-1125.000000, -483.000000)">
          <g id="Group-6" transform="translate(1125.722222, 484.000000)">
            <rect
              id="Rectangle"
              stroke="none"
              fill="none"
              x="-0.222222222"
              y="-0.5"
              width="22"
              height="21"
            ></rect>
            <line
              x1="6.72222222"
              y1="14"
              x2="2.27777778"
              y2="18.5"
              id="Line"
              stroke={color}
              strokeWidth="2"
              fill="#D8D8D8"
              strokeLinecap="round"
            ></line>
            <circle
              id="Oval"
              stroke={color}
              strokeWidth="2"
              cx="12.2777778"
              cy="9"
              r="7"
            ></circle>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default IconSearch
