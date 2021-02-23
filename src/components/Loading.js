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
      <div class="svg-wrapper">
        <svg height="40" width="40" xmlns="http://www.w3.org/2000/svg">
          <rect
            className="shape"
            height="40"
            width="40"
            stroke={color || "var(--clr-primary)"}
          />
          {!hideTitle && (
            <foreignObject class="node" x="0" y="0" width="40" height="40">
              <p className="text">TVRP</p>
            </foreignObject>
          )}
        </svg>
      </div>
    </div>
  )
}

export default Loading
