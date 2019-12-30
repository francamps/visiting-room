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
        videoSrcURL="https://vimeo.com/379573945"
        videoTitle="Kantau"
      />
      {
        null /*<div
        className="video"
        style={{
          background: `url(${source}) center center`,
          backgroundSize: "cover",
        }}
        onClick={() => {
          setShowInfo(true)
        }}
      >
        {isViewed ? (
          <VideoViewedMenu
            onClickReplay={() => {
              setViewed(false)
            }}
            onClickNext={() => {
              setSource(imageSrc2)
              setViewed(false)
            }}
          />
        ) : (
          <Play
            size="huge"
            onClick={() => {
              setViewed(true)
            }}
          />
        )}
        {showInfo && !isViewed && (
          <div className="video-info-wrap">
            <div className="video-info">
              <h3>{name}</h3>
              alt={name}
              src={oldImage}
              width="150px" onClick=
              {() => {
                setViewed(true)
                setShowInfo(false)
              }}
              />
              <div className="" style={{ display: "flex", marginTop: "16px" }}>
                <div className="" style={{}}>
                  <p className="upper-label" style={{ marginTop: "0" }}>
                    Age at sentence
                  </p>
                  <p className="actual-label">22</p>

                  <p className="upper-label">Current age</p>
                  <p className="actual-label">54</p>
                </div>
                <Circles />
              </div>
            </div>
          </div>
        )}
            </div>*/
      }

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
