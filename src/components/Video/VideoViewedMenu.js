import React from "react"

import "./VideoViewedMenu.css"

import VideoNext from "./VideoNext"

const VideoViewedMenu = ({ name, color, nextProfile }) => {
  return (
    <>
      <div className="final-card options">
        <div>
          <div className="" style={{ color: color }}>
            {name}
          </div>
          <div className="" style={{ color: "var(--clr-off-white)" }}>
            21 years old at the time of the offence (TBD)
          </div>
          <div className="" style={{ color: "var(--clr-off-white)" }}>
            39 years in prision at the time of the interview (TBD)
          </div>
        </div>
      </div>
      <VideoNext nextProfile={nextProfile} />
    </>
  )
}

export default VideoViewedMenu
