import React from "react"

import CrossClose from "../CrossClose"

import "./TimelineModal.css"

const TimelineModal = ({ styling, content, setModal, stickOnClick }) => {
  return (
    <div
      className="modal-wrap fadeinfast"
      style={{
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
