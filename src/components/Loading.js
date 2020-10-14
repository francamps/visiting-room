import React from "react"

import "./Loading.css"

const Loading = () => {
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
      <p
        style={{
          margin: 0,
          fontSize: "var(--font-copy)",
          fontFamily: "EB Garamond",
        }}
      >
        The Visting Room
      </p>
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
