import React from "react"

const Close = ({ color = "var(--clr-black)", noBackground }) => {
  return (
    <svg width="23px" height="22px" viewBox="0 0 23 22" version="1.1">
      <g
        id="Typography---UI-Comp"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinejoin="round"
      >
        <g id="Notes-Copy" transform="translate(-1050.000000, -483.000000)">
          <g id="Close" transform="translate(1051.000000, 484.000000)">
            <line
              x1="3.01471863"
              y1="9.79289322"
              x2="17.863961"
              y2="10.5"
              id="Line-9-Copy"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              transform="translate(10.292893, 10.000000) rotate(-45.000000) translate(-10.292893, -10.000000) "
            ></line>
            <line
              x1="3.01471863"
              y1="10.2071068"
              x2="17.863961"
              y2="9.5"
              id="Line-9-Copy"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              transform="translate(10.292893, 10.000000) rotate(45.000000) translate(-10.292893, -10.000000) "
            ></line>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Close
