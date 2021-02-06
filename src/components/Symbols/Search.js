import React, { useState } from "react"

const IconSearch = () => {
  const [isHover, setHover] = useState(false)

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
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        stroke-linejoin="round"
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
              stroke="#FFFFFF"
              stroke-width="2"
              fill="#D8D8D8"
              stroke-linecap="round"
            ></line>
            <circle
              id="Oval"
              stroke="#FFFFFF"
              stroke-width="2"
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
