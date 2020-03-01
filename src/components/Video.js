import React /*, { useState }*/ from "react"
import { navigate } from "gatsby"

//import Play from "./Play"
//import VideoViewedMenu from "./VideoViewedMenu"
import CrossClose from "./CrossClose"
//import Circles from "./charts/Circles"

//import imageSrc from "../images/TEMP/profile_pics/Arthur_Carter.jpg"
//import imageSrc2 from "../images/TEMP/profile_pics/Walter_Goodwin.jpg"

//import oldImage from "../images/TEMP/arthur_carter.jpg"

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
          navigate("/visiting-room")
        }}
      >
        <CrossClose />
      </div>
    </div>
  )
}

export default Video
