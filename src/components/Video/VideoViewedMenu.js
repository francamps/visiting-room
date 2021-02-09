import React from "react"

import "./VideoViewedMenu.css"

import VideoNext from "./VideoNext"

const VideoViewedMenu = ({
  name,
  color,
  nextProfile,
  age_at_offense,
  current_age,
}) => {
  return (
    <>
      <div className="final-card options">
        <div>
          <div className="" style={{ color: color }}>
            {name}
          </div>
          <div className="" style={{ color: "var(--clr-off-white)" }}>
            {`${age_at_offense} years old at the time of the offence.`}
          </div>
          <div className="" style={{ color: "var(--clr-off-white)" }}>
            {`${current_age -
              age_at_offense} years in prision at the time of the interview.`}
          </div>
        </div>
      </div>
      <VideoNext nextProfile={nextProfile} />
    </>
  )
}

export default VideoViewedMenu
