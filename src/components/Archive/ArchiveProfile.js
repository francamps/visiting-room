import React from "react"
import { navigate } from "gatsby"

import Video from "../Video/Video"

import "./Archive.css"

const ArchiveProfile = ({ pathContext }) => {
  const { profileId, full_name, color } = pathContext

  return (
    <div className="archive-wrap">
      <Video
        profileId={profileId}
        name={full_name.text}
        color={color}
        onClose={() => {
          navigate("/archive")
        }}
        isArchive
        hasTranscript
      />
    </div>
  )
}

export default ArchiveProfile
