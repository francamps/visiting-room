import React from "react"
import { navigate } from "gatsby"

import Video from "../components/Video/Video"

const ForewordPage = () => {
  return (
    <div className={`visiting-room-wrap container`}>
      <Video
        name={"Foreword"}
        onClose={() => {
          navigate("/visiting-room")
        }}
        hasCaptions={false}
        video_link="https://vimeo.com/447172431"
      />
    </div>
  )
}

export default ForewordPage
