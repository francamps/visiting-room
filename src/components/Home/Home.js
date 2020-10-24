import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"

import HomeVideo from "./HomeVideo"
import HomeTextOnLanding from "./HomeTextOnLanding"
import Header from "../Header"

import "./Home.css"

const Home = ({ images }) => {
  const [isVideoReady, setVideoReady] = useState(false)

  const [isShowVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (!isShowVideo) {
      let timerActions = setTimeout(() => {
        setShowVideo(true)
      }, 5000)

      return () => {
        clearTimeout(timerActions)
      }
    }
  }, [])

  return (
    <>
      <div className={`home`}>
        <div className={`landing ${isVideoReady ? "fadein" : ""}`}>
          <HomeVideo
            images={images}
            isShowVideo={isShowVideo}
            onVideoReady={() => {
              setVideoReady(true)
            }}
          />
        </div>
        <div className={`landing fadeinfast`}>
          <div
            className={`subtitle ${
              isVideoReady && isShowVideo ? "fadeout" : "fadeinfast"
            }`}
            style={{
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <p>
              Louisiana has nearly 5,000 people sentenced to die in prison
              without any possibility of parole.
            </p>
            <p>Here are some of their stories, in their own words.</p>
          </div>
        </div>
        <p
          style={{
            position: "fixed",
            right: "40px",
            bottom: "20px",
            cursor: "pointer",
            zIndex: "100",
            color: "white",
            fontSize: "var(--font-normal)",
            textAlign: "right",
          }}
          onClick={() => {
            navigate("/visiting-room")
          }}
        >
          Skip
        </p>
      </div>
    </>
  )
}

export default Home
