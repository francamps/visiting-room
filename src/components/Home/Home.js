import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"

import HomeVideo from "./HomeVideo"

import "./Home.css"

const Home = ({ images }) => {
  const [isVideoReady, setVideoReady] = useState(false)
  const [barProgress, setBarProgress] = useState(0)
  const [isShowVideo, setShowVideo] = useState(false)
  const [hideWords, setHideWords] = useState(false)

  useEffect(() => {
    if (!isShowVideo) {
      let timerActions = setTimeout(() => {
        setShowVideo(true)
      }, 200)
      let timerActionsWords = setTimeout(() => {
        setHideWords(true)
      }, 4000)

      return () => {
        clearTimeout(timerActions)
        clearTimeout(timerActionsWords)
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
            setBarProgress={setBarProgress}
          />
        </div>
        <div className={`landing fadeinfast`}>
          <div
            className={`subtitle ${
              isVideoReady && hideWords ? "fadeout" : "fadeinfast"
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
        <div className="skip">
          <div className="skip-bar" style={{ width: "30px" }}>
            <div
              className="skip-bar-bg"
              role="button"
              aria-label="Seek time in video"
              style={{
                position: "absolute",
                width: "100%",
                height: "4px",
                background: "rgba(255, 255, 255, 0.3)",
              }}
            />
            <div
              className="skip-bar-played"
              role="button"
              style={{
                position: "absolute",
                height: "4px",
                width: 30 * barProgress + "px",
                transition: "width 1s linear",
                background: "var(--clr-primary)",
              }}
            />
          </div>
          <p
            className="skip-label"
            onClick={() => {
              navigate("/visiting-room")
            }}
          >
            Skip
          </p>
        </div>
      </div>
    </>
  )
}

export default Home
