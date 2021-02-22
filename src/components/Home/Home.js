import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { navigate } from "gatsby"

import HomeVideo from "./HomeVideo"
import Skip from "./Skip"
import MenuButton from "../MenuButton"

import audio from "../../content/audio/stanfield/landingFull.mp3"

import "./Home.css"

const Home = ({ images }) => {
  const [barProgress, setBarProgress] = useState(0)
  const [hideWords, setHideWords] = useState(false)

  useEffect(() => {
    let timerActionsWords = setTimeout(() => {
      setHideWords(true)
    }, 8000)

    return () => {
      clearTimeout(timerActionsWords)
    }
  }, [])

  return (
    <>
      <div className="home">
        <div className="landing" style={{ background: "black" }}>
          <HomeVideo images={images} setBarProgress={setBarProgress} />
        </div>
        <div className={`landing fadeinfast`}>
          <div className="home-title">
            <span>The</span>
            <br />
            <span>Visting Room</span>
            <br />
            <span>Project</span>
            <br />
          </div>
          <ReactPlayer
            url={audio}
            volume={Math.max(
              1 - (barProgress > 0.8 ? (barProgress - 0.8) / 0.2 : 0),
              0.0
            )}
            playing
            controls={false}
          />
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
        <div className="menu-buttons">
          <MenuButton
            buttonContent={"Skip"}
            onClick={() => {
              navigate("/visiting-room")
            }}
            tooltipActive
            tooltipContent={
              <div className="skip-bar">
                <div
                  className="skip-bar-bg"
                  role="button"
                  aria-label="Seek time in video"
                />
                <div
                  className="skip-bar-played"
                  role="button"
                  style={{
                    width: 30 * barProgress + "px",
                  }}
                />
              </div>
            }
          />
        </div>
      </div>
    </>
  )
}

export default Home
