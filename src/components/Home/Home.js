import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import HomeVideo from "./HomeVideo"
import Skip from "./Skip"

import "./Home.css"

import audio from "../../content/audio/stanfield/landingFull.mp3"

const Home = ({ images }) => {
  const [barProgress, setBarProgress] = useState(0)
  const [hideWords, setHideWords] = useState(false)

  useEffect(() => {
    let timerActionsWords = setTimeout(() => {
      setHideWords(true)
    }, 5000)

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
          {hideWords && false && (
            <audio autoPlay>
              <source
                src={"./audio/landing.mp3"}
                id="mp3Source"
                type="audio/mpeg"
              />
              <source
                src={"./audio/landing.ogg"}
                id="oggSource"
                type="audio/ogg"
              />
              Your browser does not support the audio element.
            </audio>
          )}
          <ReactPlayer url={audio} volume={1} playing controls={false} />
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
