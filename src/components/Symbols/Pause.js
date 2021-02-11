import React, { useState } from "react"

const Pause = ({ onClick, useCircle = true, doHover, color = "#ffffff" }) => {
  const [isHover, setHover] = useState(doHover)
  let viewBox = "0 0 24 24"
  let width = "24px"
  let height = "24px"
  let cx = 12
  let cy = 12
  let r = 10
  let transform = "none"

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
      {useCircle && (
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
      )}
      <rect
        x={cx - 5}
        y={cy - 6}
        width={4}
        height={12}
        strokeLinejoin="round"
        fillRule="evenodd"
        fill={color}
        stroke="none"
        opacity="0.7"
        style={{
          transform,
          opacity: isHover ? 1 : 0.8,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
      />
      <rect
        x={cx + 1}
        y={cy - 6}
        width={4}
        height={12}
        strokeLinejoin="round"
        fillRule="evenodd"
        fill={color}
        stroke="none"
        opacity="0.7"
        style={{
          transform,
          opacity: isHover ? 1 : 0.8,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
      />
    </svg>
  )
}

export default Pause
