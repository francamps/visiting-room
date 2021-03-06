import React, { useState } from "react"

const Sort = ({ sortAsc, enabled, theme }) => {
  const [isHover, setHover] = useState(false)
  const color = theme === "light" ? "var(--clr-dark-grey)" : "var(--clr-white)"

  return (
    <svg
      width="23px"
      height="22px"
      viewBox="-2 0 23 14"
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
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: enabled ? 1 : 0.2,
          transition: "opacity 0.4s",
        }}
      >
        <g
          id="Notes-Copy"
          transform="translate(-1052.000000, -512.000000)"
          stroke={color}
          strokeWidth="2"
        >
          <g id="Group-3-Copy" transform="translate(1051.000000, 509.000000)">
            <g id="Group-4" transform="translate(1.500000, 3.500000)">
              <line
                x1="0.5"
                x2="17.5"
                y1={sortAsc ? "12.5" : "0.5"}
                y2={sortAsc ? "12.5" : "0.5"}
                id="Line-9"
              ></line>
              <line
                x1="0.5"
                x2="12.5"
                y1={sortAsc ? "8.5" : "4.5"}
                y2={sortAsc ? "8.5" : "4.5"}
                id="Line-9-Copy"
              ></line>
              <line
                x1="0.5"
                x2="7.5"
                y1={sortAsc ? "4.5" : "8.5"}
                y2={sortAsc ? "4.5" : "8.5"}
                id="Line-9-Copy-2"
              ></line>
              <line
                x1="0.5"
                x2="2.5"
                y1={sortAsc ? "0.5" : "12.5"}
                y2={sortAsc ? "0.5" : "12.5"}
                id="Line-9-Copy-3"
              ></line>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Sort
