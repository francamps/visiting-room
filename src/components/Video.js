import React /*, { useState }*/ from "react"
import { navigate } from "gatsby"

import CrossClose from "./CrossClose"
import "./Video.css"
import VideoPlayer from "./VideoPlayer"

import { videos } from "../content/videoRegistry"

const Video = ({ name, profileId, setView }) => {
  //const [isViewed, setViewed] = useState(false)
  //const [source, setSource] = useState(imageSrc)
  //const [showInfo, setShowInfo] = useState(false)

  console.log(videos, name, videos[name])

  return (
    <div className="video-wrap">
      <VideoPlayer videoSrcURL={videos[name]} videoTitle="" />
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
        }}
        onClick={() => {
          navigate("/visiting-room")
        }}
      >
        <CrossClose />
      </div>
    </div>
  )
}

export default Video
