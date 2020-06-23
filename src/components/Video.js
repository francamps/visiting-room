import React /*, { useState }*/ from "react"
import { navigate } from "gatsby"

import CrossClose from "./CrossClose"
import "./Video.css"
import VideoPlayer from "./VideoPlayer"

const Video = ({ name, profileId, setView }) => {
  //const [isViewed, setViewed] = useState(false)
  //const [source, setSource] = useState(imageSrc)
  //const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="video-wrap">
      <VideoPlayer
        videoSrcURL="https://vimeo.com/394804722"
        videoTitle="Kantau"
      />
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
        }}
        onClick={() => {
          navigate("/?visiting=true")
        }}
      >
        <CrossClose />
      </div>
    </div>
  )
}

export default Video
