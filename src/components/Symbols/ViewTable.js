import React, { useState } from "react"

const ViewTable = ({ theme }) => {
  const [isHover, setHover] = useState(false)

  const color = theme === "light" ? "var(--clr-dark-grey)" : "var(--clr-white)"

  return (
    <svg
      width="23px"
      height="22px"
      viewBox="0 0 23 22"
      version="1.1"
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
        <g id="Notes-Copy" transform="translate(-1075.000000, -483.000000)">
          <g id="View-table" transform="translate(1076.000000, 484.000000)">
            <rect
              id="Rectangle"
              stroke="none"
              fill="none"
              x="-0.5"
              y="-0.5"
              width="22"
              height="21"
            ></rect>
            <rect
              id="Rectangle"
              stroke={color}
              fill={color}
              x="2"
              y="2"
              width="4"
              height="4"
            ></rect>
            <rect
              id="Rectangle-Copy-3"
              stroke={color}
              fill={color}
              x="2"
              y="8"
              width="4"
              height="4"
            ></rect>
            <rect
              id="Rectangle-Copy-4"
              stroke={color}
              fill={color}
              x="2"
              y="14"
              width="4"
              height="4"
            ></rect>
            <line
              x1="7.5"
              y1="4.5"
              x2="19.5"
              y2="4.5"
              id="Line-9-Copy-12"
              stroke={color}
              strokeLinecap="round"
            ></line>
            <line
              x1="7.5"
              y1="2.5"
              x2="16.5"
              y2="2.5"
              id="Line-9-Copy"
              stroke={color}
              strokeLinecap="round"
            ></line>
            <line
              x1="7.5"
              y1="10.5"
              x2="17.5"
              y2="10.5"
              id="Line-9-Copy-14"
              stroke={color}
              strokeLinecap="round"
            ></line>
            <line
              x1="7.5"
              y1="8.5"
              x2="18.5"
              y2="8.5"
              id="Line-9-Copy-13"
              stroke={color}
              strokeLinecap="round"
            ></line>
            <line
              x1="7.5"
              y1="16.5"
              x2="19.5"
              y2="16.5"
              id="Line-9-Copy-16"
              stroke={color}
              strokeLinecap="round"
            ></line>
            <line
              x1="7.5"
              y1="14.5"
              x2="14.5"
              y2="14.5"
              id="Line-9-Copy-15"
              stroke={color}
              strokeLinecap="round"
            ></line>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default ViewTable
