import React, { useState } from "react"

const Play = ({ size, onClick }) => {
  const [isHover, setHover] = useState(false)
  if (size === "small") {
    return (
      <svg
        className="play"
        width="9px"
        height="10px"
        viewBox="0 0 9 10"
        onClick={onClick}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <polygon
          strokeLinejoin="round"
          fillRule="evenodd"
          fill="#ffffff"
          stroke="#ffffff"
          opacity="0.7"
          points="7.38461538 4 0 8 0 0"
        ></polygon>
      </svg>
    )
  }

  if (size === "huge") {
    return (
      <svg
        className="play"
        width="90px"
        height="90px"
        viewBox="0 0 90 90"
        style={{
          pointerEvents: "all",
        }}
        onClick={onClick}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <circle cx={45} cy={45} stroke="#ffffff" fill={"none"} r={44} />
        <polygon
          strokeLinejoin="round"
          fillRule="evenodd"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth={2}
          points="33.3 18 0 36 0 0"
          style={{
            transform: "translate(32px, 27px)",
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
        ></polygon>
      </svg>
    )
  }

  return (
    <svg
      className="play"
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      style={{
        pointerEvents: "all",
      }}
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <circle cx={10} cy={10} stroke="#ffffff" fill={"none"} r={9} />
      <polygon
        strokeLinejoin="round"
        fillRule="evenodd"
        fill="#ffffff"
        stroke="#ffffff"
        opacity="0.7"
        points="7.4 4 0 8 0 0"
        style={{
          transform: "translate(7px, 6px)",
          opacity: isHover ? 1 : 0.6,
          transition: "opacity 0.4s",
        }}
      ></polygon>
    </svg>
  )
}

export default Play
