import React, { useState } from "react"

const GridButton = ({ size, onClick, useCircle = true }) => {
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
        <circle cx={3} cy={3} r={3} />
        <circle cx={9} cy={3} r={3} />
        <circle cx={15} cy={3} r={3} />
        <circle cx={3} cy={9} r={3} />
        <circle cx={9} cy={9} r={3} />
        <circle cx={15} cy={9} r={3} />
        <circle cx={3} cy={15} r={3} />
        <circle cx={9} cy={15} r={3} />
        <circle cx={15} cy={15} r={3} />
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
        <circle
          fill="#ffffff"
          style={{
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          cx={30}
          cy={30}
          r={3}
        />
        <circle
          fill="#ffffff"
          style={{
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          cx={45}
          cy={30}
          r={3}
        />
        <circle
          fill="#ffffff"
          style={{
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          cx={60}
          cy={30}
          r={3}
        />
        <circle
          fill="#ffffff"
          style={{
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          cx={30}
          cy={45}
          r={3}
        />
        <circle
          fill="#ffffff"
          style={{
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          cx={45}
          cy={45}
          r={3}
        />
        <circle
          fill="#ffffff"
          style={{
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          cx={60}
          cy={45}
          r={3}
        />
        <circle
          fill="#ffffff"
          style={{
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          cx={30}
          cy={60}
          r={3}
        />
        <circle
          fill="#ffffff"
          style={{
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          cx={45}
          cy={60}
          r={3}
        />
        <circle
          fill="#ffffff"
          style={{
            opacity: isHover ? 1 : 0.6,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          cx={60}
          cy={60}
          r={3}
        />
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
      {useCircle && (
        <circle cx={10} cy={10} stroke="#ffffff" fill={"none"} r={9} />
      )}
      <circle
        fill="#ffffff"
        style={{
          opacity: isHover ? 1 : 0.6,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
        cx={3}
        cy={3}
        r={3}
      />
      <circle
        fill="#ffffff"
        style={{
          opacity: isHover ? 1 : 0.6,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
        cx={9}
        cy={3}
        r={3}
      />
      <circle
        fill="#ffffff"
        style={{
          opacity: isHover ? 1 : 0.6,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
        cx={15}
        cy={3}
        r={3}
      />
      <circle
        fill="#ffffff"
        style={{
          opacity: isHover ? 1 : 0.6,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
        cx={3}
        cy={9}
        r={3}
      />
      <circle
        fill="#ffffff"
        style={{
          opacity: isHover ? 1 : 0.6,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
        cx={9}
        cy={9}
        r={3}
      />
      <circle
        fill="#ffffff"
        style={{
          opacity: isHover ? 1 : 0.6,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
        cx={15}
        cy={9}
        r={3}
      />
      <circle
        fill="#ffffff"
        style={{
          opacity: isHover ? 1 : 0.6,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
        cx={3}
        cy={15}
        r={3}
      />
      <circle
        fill="#ffffff"
        style={{
          opacity: isHover ? 1 : 0.6,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
        cx={9}
        cy={15}
        r={3}
      />
      <circle
        fill="#ffffff"
        style={{
          opacity: isHover ? 1 : 0.6,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
        cx={15}
        cy={15}
        r={3}
      />
    </svg>
  )
}

export default GridButton
