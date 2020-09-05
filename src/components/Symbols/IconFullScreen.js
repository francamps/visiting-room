import React, { useState } from "react"

const IconFullScreen = ({ size, onClick, doHover, color = "#ffffff" }) => {
  const [isHover, setHover] = useState(doHover)

  return (
    <svg
      width="23px"
      height="23px"
      viewBox="0 0 23 23"
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
          <path d="M0.5,0.5 L0.5,8.5 M0.5,0.5 L8.5,0.5"></path>
          <path
            d="M0.5,12.5 L0.5,20.5 M0.5,12.5 L8.5,12.5"
            transform="translate(4.500000, 16.500000) scale(1, -1) translate(-4.500000, -16.500000) "
          ></path>
          <path
            d="M12.5,12.5 L12.5,20.5 M12.5,12.5 L20.5,12.5"
            transform="translate(16.500000, 16.500000) scale(-1, -1) translate(-16.500000, -16.500000) "
          ></path>
          <path
            d="M12.5,0.5 L12.5,8.5 M12.5,0.5 L20.5,0.5"
            transform="translate(16.500000, 4.500000) scale(-1, 1) translate(-16.500000, -4.500000) "
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default IconFullScreen
