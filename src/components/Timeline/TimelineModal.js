import React from "react"

import CrossClose from "../CrossClose"

import "./TimelineModal.css"

const TimelineModal = ({ styling, content, setModal }) => {
  return (
    <div
      className="fadeinfast"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        backdropFilter: "blur(6px)",
        background: "rgba(var(--clr-white-rgb), 0.8)",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "10px 5px 5px white",
        zIndex: 12,
        ...styling,
      }}
      onClick={() => {
        setModal(false)
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
      >
        <CrossClose
          onClick={() => {
            setModal(false)
          }}
          theme="light"
        />
      </div>
      <div className="modal">
        <p>{content}</p>
      </div>
    </div>
  )
}

export default TimelineModal
