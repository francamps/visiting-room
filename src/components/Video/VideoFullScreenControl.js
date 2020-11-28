import React from "react"

import IconFullScreen from "../Symbols/FullScreen"

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
        cursor: "pointer",
      }}
    >
      <IconFullScreen color={active ? color : undefined} enabled={active} />
    </div>
  )
}

export default VideoFullScreenControl
