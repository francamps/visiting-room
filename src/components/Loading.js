import React from "react"

import "./Loading.css"

const Loading = ({ hideTitle = false, color }) => {
  return (
    <div
      className="loader-wrap"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "60px",
        alignItems: "center",
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
