import React, { useState } from "react"

const Transcript = ({ color = "#000000" }) => {
  const [isHover, setHover] = useState(false)
  return (
    <svg width="23px" height="22px" viewBox="0 0 23 22" version="1.1">
      <g
        id="Typography---UI-Comp"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        style={{ opacity: isHover ? 1 : 0.8, transition: "opacity 0.4s" }}
        onMouseOver={() => {
          setHover(true)
        }}
        onMouseOut={() => {
          setHover(false)
        }}
      >
        <g id="Notes-Copy" transform="translate(-996.000000, -510.000000)">
          <g id="Group-3" transform="translate(997.000000, 511.000000)">
            <rect
              id="Rectangle"
              stroke={color}
              fill={color}
              strokeLinejoin="round"
              x="-0.5"
              y="-0.5"
              width="22"
              height="21"
            ></rect>
            <path
              d="M12,3 C12.5522847,3 13,3.44771525 13,4 C13,4.51283584 12.6139598,4.93550716 12.1166211,4.99327227 L12,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.48716416 1.38604019,3.06449284 1.88337887,3.00672773 L2,3 L12,3 Z"
              id="Line-7"
              fill="#000000"
              fillRule="nonzero"
            ></path>
            <path
              d="M19,7 C19.5522847,7 20,7.44771525 20,8 C20,8.51283584 19.6139598,8.93550716 19.1166211,8.99327227 L19,9 L9,9 C8.44771525,9 8,8.55228475 8,8 C8,7.48716416 8.38604019,7.06449284 8.88337887,7.00672773 L9,7 L19,7 Z"
              id="Line-7-Copy-4"
              fill="#000000"
              fillRule="nonzero"
            ></path>
            <path
              d="M6,7 C6.55228475,7 7,7.44771525 7,8 C7,8.51283584 6.61395981,8.93550716 6.11662113,8.99327227 L6,9 L2,9 C1.44771525,9 1,8.55228475 1,8 C1,7.48716416 1.38604019,7.06449284 1.88337887,7.00672773 L2,7 L6,7 Z"
              id="Line-7-Copy-6"
              fill="#000000"
              fillRule="nonzero"
            ></path>
            <path
              d="M12,11 C12.5522847,11 13,11.4477153 13,12 C13,12.5128358 12.6139598,12.9355072 12.1166211,12.9932723 L12,13 L2,13 C1.44771525,13 1,12.5522847 1,12 C1,11.4871642 1.38604019,11.0644928 1.88337887,11.0067277 L2,11 L12,11 Z"
              id="Line-7-Copy-5"
              fill="#000000"
              fillRule="nonzero"
            ></path>
            <path
              d="M19,3 C19.5522847,3 20,3.44771525 20,4 C20,4.51283584 19.6139598,4.93550716 19.1166211,4.99327227 L19,5 L15,5 C14.4477153,5 14,4.55228475 14,4 C14,3.48716416 14.3860402,3.06449284 14.8833789,3.00672773 L15,3 L19,3 Z"
              id="Line-7-Copy-3"
              fill="#000000"
              fillRule="nonzero"
            ></path>
            <path
              d="M17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5128358 17.6139598,12.9355072 17.1166211,12.9932723 L17,13 L15,13 C14.4477153,13 14,12.5522847 14,12 C14,11.4871642 14.3860402,11.0644928 14.8833789,11.0067277 L15,11 L17,11 Z"
              id="Line-7-Copy-7"
              fill="#000000"
              fillRule="nonzero"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Transcript
