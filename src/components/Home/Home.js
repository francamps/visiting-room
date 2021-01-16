import React, { useEffect, useState } from "react"

import HomeVideo from "./HomeVideo"
import Skip from "./Skip"

import "./Home.css"

const Home = ({ images }) => {
  const [isVideoReady, setVideoReady] = useState(false)
  const [barProgress, setBarProgress] = useState(0)
  const [isShowVideo, setShowVideo] = useState(false)
  const [hideWords, setHideWords] = useState(false)

  useEffect(() => {
    //if (!isShowVideo) {
    let timerActions = setTimeout(() => {
      setShowVideo(true)
    }, 0)
    let timerActionsWords = setTimeout(() => {
      setHideWords(true)
    }, 5000)

    return () => {
      clearTimeout(timerActions)
      clearTimeout(timerActionsWords)
    }
    //}
  }, [])

  return (
    <>
      <div className={`home`}>
        <div
          className={`landing fadein ${isVideoReady ? "fadein" : ""}`}
          style={{ background: "black" }}
        >
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
            style={{
              fontFamily: "EB Garamond",
              fontSize: "var(--font-normal)",
              color: "var(--clr-white)",
              position: "fixed",
              top: "40px",
              left: "40px",
              textAlign: "center",
            }}
          >
            <span>The</span>
            <br />
            <span>Visting Room</span>
            <br />
            <span>Project</span>
            <br />
          </div>
          <div
            className={`subtitle ${hideWords ? "fadeout" : "fadeinfast"}`}
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
        <Skip barProgress={barProgress} />
      </div>
    </>
  )
}

export default Home
