import React from "react"
import { navigate } from "gatsby"

import Video from "../Video/Video"

import getProfileProps from "../../utils/getProfileProps"

import "./VisitingRoom.css"

const VisitingRoom = ({ pathContext }) => {
  const { profileId, full_name, color, nextProfile, video_link } = pathContext

  const { age_at_offense, current_age } = getProfileProps(pathContext)

  return (
    <div className={`visiting-room-wrap container`}>
      <Video
        profileId={profileId}
        name={full_name.text}
        age_at_offense={age_at_offense}
        current_age={current_age}
        color={color}
        onClose={() => {
          navigate("/visiting-room")
        }}
        nextProfile={nextProfile}
        hasCaptions
        video_link={video_link && video_link.url}
      />
    </div>
  )
}

export default VisitingRoom
