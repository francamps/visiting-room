import React from "react"

import "./Loading.css"

const Loading = ({ color, hideTitle = false, size }) => {
  return (
    <div
      className="loader-wrap"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "60px",
        alignItems: "center",
        ...{
          transform:
            size === "small" ? "scale(0.4) translate(0, -20px)" : "none",
          transformOrigin: "center center",
        },
      }}
    >
      <div className="svg-wrapper">
        <svg height="40" width="40" xmlns="http://www.w3.org/2000/svg">
          <rect
            className="shape"
            height="40"
            width="40"
            stroke={color || "var(--clr-primary)"}
          />
        </svg>
      </div>
    </div>
  )
}

export default Loading
