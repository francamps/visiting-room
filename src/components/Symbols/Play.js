import React, { useState } from "react"

const Play = ({ size, onClick, useCircle, doHover, color = "#ffffff" }) => {
  const [isHover, setHover] = useState(doHover)
  let viewBox = "0 0 24 24"
  let width = "24px"
  let height = "24px"
  let cx = 12
  let cy = 12
  let r = 10
  let points = "16 12 9 16 9 8"
  let transform = "none"

  if (size === "small") {
    viewBox = "0 0 9 10"
    width = "9px"
    height = "10px"
    cx = 5
    cy = 5
    r = 4
    points = "7.38461538 4 0 8 0 0"
    transform = "none"
  }

  if (size === "large") {
    viewBox = "0 0 45 45"
    width = "45px"
    height = "45px"
    cx = 22.5
    cy = 22
    r = 21
    points = "17 9 0 18 0 0"
    transform = "translate(15px, 13.5px)"
  }

  if (size === "huge") {
    viewBox = "0 0 90 90"
    width = "90px"
    height = "90px"
    cx = 45
    cy = 45
    r = 44
    points = "33.3 18 0 36 0 0"
    transform = "translate(32px, 27px)"
  }

  return (
    <svg
      className="play"
      width={width}
      height={height}
      viewBox={viewBox}
      style={{
        pointerEvents: "all",
      }}
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <circle
        cx={cx}
        cy={cy}
        stroke={color}
        fill={"none"}
        r={r}
        strokeWidth={2}
        style={{
          opacity: isHover ? 1 : 0.8,
          transition: "opacity 0.4s",
        }}
      />
      <polygon
        strokeLinejoin="round"
        fillRule="evenodd"
        fill={color}
        stroke={color}
        opacity="0.7"
        points={points}
        style={{
          transform,
          opacity: isHover ? 1 : 0.8,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
      ></polygon>
    </svg>
  )
}

export default Play
