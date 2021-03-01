import React, { useState } from "react"

const IconSound = () => {
  const [isHover, setHover] = useState(false)

  return (
    <svg
      width="24px"
      height="22px"
      viewBox="0 0 24 22"
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
        <g id="Notes-Copy" transform="translate(-1154.000000, -508.000000)">
          <g id="Group-6-Copy-2" transform="translate(1155.000000, 509.000000)">
            <rect
              id="Rectangle"
              stroke="none"
              fill="none"
              x="-0.222222222"
              y="-0.5"
              width="22"
              height="21"
            ></rect>
            <path
              d="M13.5,2.34442061 L7.5,5.80914658 L7.5,14.2843614 L13.5,17.8531694 L13.5,2.34442061 Z"
              id="Path-2"
              stroke="#FFFFFF"
              fill="#FFFFFF"
            ></path>
            <path
              d="M5.3611511,6.5 L1.5,6.5 L1.5,13.4949457 L5.3611511,13.4949457 L5.3611511,6.5 Z"
              id="Path-2"
              stroke="#FFFFFF"
              fill="#FFFFFF"
            ></path>
          </g>
          <path
            d="M1171.01396,516 C1171.01396,516 1173.01396,518.994946 1171.01396,521.994946"
            id="Path-3"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
          <path
            d="M1173.01396,513.994946 C1173.01396,513.994946 1176.12173,518.994946 1173.01396,523.994946"
            id="Path-3"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default IconSound
