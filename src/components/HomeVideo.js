import React from "react"

import video from "../images/video_background.mp4"
import "./HomeVideo.css"

const HomeVideo = () => {
  return (
    <div class="fullscreen-bg">
      <video
        loop
        muted
        autoPlay
        //poster="img/videoframe.jpg"
        className="fullscreen-bg__video"
      >
        {null /*<source src={video} type="video/webm">*/}
        <source src={video} type="video/mp4" />
        {null /*<source src={video} type="video/ogg">*/}
      </video>
      <div className="fullscreen-bg__blur" />
    </div>
  )
}

export default HomeVideo
