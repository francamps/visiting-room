import React from "react"

import CrossClose from "../CrossClose"

import "./TimelineModal.css"

const TimelineModal = ({ styling, content, setModal, stickOnClick }) => {
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
        background: "rgba(var(--clr-white-rgb), 0.9)",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "10px 5px 5px white",
        zIndex: 12,
        ...styling,
      }}
      onClick={() => {
        if (!stickOnClick) setModal(false)
      }}
    >
      <div className="modal" style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
          }}
        >
          <CrossClose
            onClick={() => {
              setModal(false)
            }}
            theme="light"
          />
        </div>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default TimelineModal
