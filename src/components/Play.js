import React, { useState } from "react"

const Play = ({ size, onClick, useCircle = true, doHover }) => {
  const [isHover, setHover] = useState(doHover)
  if (size === "small") {
    return (
      <svg
        className="play"
        width="9px"
        height="10px"
        viewBox="0 0 9 10"
        onClick={onClick}
        onMouseOver={() => setHover(true)}
        onFocus={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onBlur={() => setHover(false)}
      >
        <circle
          cx={5}
          cy={5}
          stroke="#ffffff"
          fill={"none"}
          r={4}
          strokeWidth={2}
        />
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

  if (size === "large") {
    return (
      <svg
        className="play"
        width="45px"
        height="45px"
        viewBox="0 0 45 45"
        style={{
          pointerEvents: "all",
        }}
        onClick={onClick}
        onMouseOver={() => setHover(true)}
        onFocus={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onBlur={() => setHover(false)}
      >
        <circle
          cx={22.5}
          cy={22}
          stroke="#ffffff"
          fill={"none"}
          r={21}
          strokeWidth={2}
        />
        <polygon
          strokeLinejoin="round"
          fillRule="evenodd"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth={2}
          points="17 9 0 18 0 0"
          style={{
            transform: "translate(15px, 13.5px)",
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
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
        onFocus={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onBlur={() => setHover(false)}
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
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      style={{
        pointerEvents: "all",
      }}
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <circle
        cx={12}
        cy={12}
        stroke="#ffffff"
        fill={"none"}
        r={10}
        strokeWidth={2}
        style={{
          opacity: isHover ? 1 : 0.8,
          transition: "opacity 0.4s",
        }}
      />
      <polygon
        strokeLinejoin="round"
        fillRule="evenodd"
        fill="#ffffff"
        stroke="#ffffff"
        opacity="0.7"
        points="16 12 8 16 8 8"
        style={{
          opacity: isHover ? 1 : 0.8,
          transition: "opacity 0.4s",
        }}
      ></polygon>
    </svg>
  )
}

export default Play
