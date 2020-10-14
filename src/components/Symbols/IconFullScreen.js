import React, { useState } from "react"

const IconFullScreen = ({ size, onClick, doHover, color = "#ffffff" }) => {
  const [isHover, setHover] = useState(doHover)

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <g
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity={isHover ? 1 : 0.8}
      >
        <g stroke={color} stroke-width={isHover ? 3 : 2}>
          <path d="M1,1 L1,8 M1,1 L8,1"></path>
          <path
            d="M1,12 L1,20 M1,12 L8,12"
            transform="translate(4, 16) scale(1, -1) translate(-4, -16) "
          ></path>
          <path
            d="M12,12 L12,20 M12,12 L20,12"
            transform="translate(16, 16) scale(-1, -1) translate(-16, -16) "
          ></path>
          <path
            d="M12,1 L12,8 M12,1 L20,1"
            transform="translate(16, 4) scale(-1, 1) translate(-16, -4) "
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default IconFullScreen
