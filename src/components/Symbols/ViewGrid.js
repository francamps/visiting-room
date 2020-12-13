import React, { useState } from "react"

const ViewGrid = () => {
  const [isHover, setHover] = useState(false)

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
      >
        <g id="Notes-Copy" transform="translate(-1100.000000, -483.000000)">
          <g id="View-Grid" transform="translate(1101.000000, 484.000000)">
            <rect
              id="Rectangle"
              stroke="none"
              fill="none"
              strokeLinejoin="round"
              x="-0.5"
              y="-0.5"
              width="22"
              height="21"
            ></rect>
            <rect
              id="Rectangle-Copy-6"
              stroke="#FFFFFF"
              fill="#FFFFFF"
              strokeLinejoin="round"
              x="1"
              y="2"
              width="5"
              height="7"
            ></rect>
            <rect
              id="Rectangle-Copy-7"
              stroke="#FFFFFF"
              fill="#FFFFFF"
              strokeLinejoin="round"
              x="1"
              y="11"
              width="5"
              height="7"
            ></rect>
            <rect
              id="Rectangle-Copy-9"
              stroke="#FFFFFF"
              fill="#FFFFFF"
              strokeLinejoin="round"
              x="8"
              y="2"
              width="5"
              height="7"
            ></rect>
            <rect
              id="Rectangle-Copy-15"
              stroke="#FFFFFF"
              fill="#FFFFFF"
              strokeLinejoin="round"
              x="8"
              y="11"
              width="5"
              height="7"
            ></rect>
            <rect
              id="Rectangle-Copy-17"
              stroke="#FFFFFF"
              fill="#FFFFFF"
              strokeLinejoin="round"
              x="15"
              y="2"
              width="5"
              height="7"
            ></rect>
            <rect
              id="Rectangle-Copy-18"
              stroke="#FFFFFF"
              fill="#FFFFFF"
              strokeLinejoin="round"
              x="15"
              y="11"
              width="5"
              height="7"
            ></rect>
            <line
              x1="1.5"
              y1="17"
              x2="5.5"
              y2="17"
              id="Line-10-Copy-2"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="2"
              y1="15.5"
              x2="4"
              y2="15.5"
              id="Line-10-Copy-3"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="8.5"
              y1="17"
              x2="12.5"
              y2="17"
              id="Line-10-Copy-4"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="9"
              y1="15.5"
              x2="11"
              y2="15.5"
              id="Line-10-Copy-5"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="15.5"
              y1="17"
              x2="19.5"
              y2="17"
              id="Line-10-Copy-6"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="16"
              y1="15.5"
              x2="18"
              y2="15.5"
              id="Line-10-Copy-7"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="15.5"
              y1="8"
              x2="19.5"
              y2="8"
              id="Line-10-Copy-8"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="16"
              y1="6.5"
              x2="18"
              y2="6.5"
              id="Line-10-Copy-9"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="8.5"
              y1="8"
              x2="12.5"
              y2="8"
              id="Line-10-Copy-10"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="9"
              y1="6.5"
              x2="11"
              y2="6.5"
              id="Line-10-Copy-11"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="1.5"
              y1="8"
              x2="5.5"
              y2="8"
              id="Line-10-Copy-12"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
            <line
              x1="2"
              y1="6.5"
              x2="4"
              y2="6.5"
              id="Line-10-Copy-13"
              stroke="#000000"
              strokeLinecap="round"
            ></line>
          </g>
        </g>
      </g>
    </svg>
  )
}
export default ViewGrid
