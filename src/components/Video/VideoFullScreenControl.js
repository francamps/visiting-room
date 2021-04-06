import React from "react"

import IconFullScreen from "../Symbols/FullScreen"
import { handleKeyUp } from "../../utils"

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
      onKeyUp={ev =>
        handleKeyUp(ev, () => {
          if (active) {
            onExit()
          } else {
            onEnter()
          }
        })
      }
      role="button"
      tabIndex={0}
      style={{
        cursor: "pointer",
      }}
    >
      <IconFullScreen color={active ? color : undefined} enabled={active} />
    </div>
  )
}

export default VideoFullScreenControl
