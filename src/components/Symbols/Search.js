import React, { useState } from "react"

const IconSearch = () => {
  const [isHover, setHover] = useState(false)

  return (
    <svg
      width="15px"
      height="16px"
      viewBox="-1 -1 14 14"
      style={{ opacity: isHover ? 1 : 0.8, transition: "opacity 0.4s" }}
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseOut={() => {
        setHover(false)
      }}
    >
      <path
        d="M3.1875,9.36764706 L0.1875,12.8088235"
        strokeLinecap="round"
        stroke="white"
        strokeWidth="2px"
      ></path>
      <ellipse
        cx="6.75"
        cy="5.65294118"
        rx="5.25"
        ry="5.35294118"
        stroke="white"
        strokeWidth="2px"
        fill="none"
      ></ellipse>
    </svg>
  )
}

export default IconSearch
