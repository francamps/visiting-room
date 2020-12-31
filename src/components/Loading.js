import React from "react"

import "./Loading.css"

const Loading = ({ hideTitle = false }) => {
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
        <svg height="40" width="180" xmlns="http://www.w3.org/2000/svg">
          <rect
            className="shape"
            height="40"
            width="180"
            stroke={`var(--clr-primary)`}
          />
          {!hideTitle && (
            <foreignObject class="node" x="0" y="0" width="180" height="40">
              <p className="text">The Visiting Room</p>
            </foreignObject>
          )}
        </svg>
      </div>
    </div>
  )
}

const LoadingOLD = ({ hideTitle = false }) => {
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
      {!hideTitle && (
        <p
          style={{
            margin: 0,
            fontSize: "var(--font-copy)",
            fontFamily: "EB Garamond",
          }}
        >
          The Visting Room
        </p>
      )}
      <div className="loader">
        <div className="loader-cell loader-cell-0"></div>
        <div className="loader-cell loader-cell-1"></div>
        <div className="loader-cell loader-cell-2"></div>
        <div className="loader-cell loader-cell-3"></div>
        <div className="loader-cell loader-cell-4"></div>
        <div className="loader-cell loader-cell-5"></div>
        <div className="loader-cell loader-cell-6"></div>
        <div className="loader-cell loader-cell-7"></div>
        <div className="loader-cell loader-cell-8"></div>
        <div className="loader-cell loader-cell-9"></div>
        <div className="loader-cell loader-cell-10"></div>
      </div>
    </div>
  )
}

export default Loading
