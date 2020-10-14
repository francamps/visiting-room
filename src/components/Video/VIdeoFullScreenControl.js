import React from "react"

import IconFullScreen from "../Symbols/IconFullScreen"

const VideoFullScreenControl = ({ active, onExit, onEnter, color }) => {
  return (
    <div
      className={`fullscreen-action-btn ${active ? "active" : ""}`}
      onClick={() => {
        if (active) {
          onExit()
        } else {
          onEnter()
        }
      }}
      style={{
        transform: "translate(0, -1px)",
        transformOrigin: "center center",
        height: "23px",
      }}
    >
      <IconFullScreen color={active ? color : undefined} />
    </div>
  )
}

export default VideoFullScreenControl
