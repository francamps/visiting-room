import React from "react"
import { navigate } from "gatsby"

import "./VideoNext.css"

const VideoNext = ({ nextProfile }) => {
  return (
    <div
      className="video-next fadein"
      onClick={() => {
        const profileUri = nextProfile.full_name.text
          .toLowerCase()
          .replace(/ /g, "_")
        navigate(`/visiting-room/${profileUri}`)
      }}
      style={{
        backgroundImage: `url(${nextProfile.profile_picture.fluid.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <p style={{ margin: 0, fontSize: "var(--font-small)" }}>Next visit</p>
      {nextProfile && (
        <p
          style={{
            margin: 0,
            fontFamily: "EB Garamond",
            fontSize: "var(--font-copy)",
          }}
        >
          {nextProfile.full_name.text}
        </p>
      )}
    </div>
  )
}

export default VideoNext
