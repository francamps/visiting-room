import React, { useEffect, useState } from "react"

import HomeVideo from "./HomeVideo"
import Skip from "./Skip"
import Loading from "../Loading"
import Header from "../Header"
//import audio from "../../content/audio/stanfield/landingFull.mp3"

import "./Home.css"
import "../Header.css"
import "./Skip.css"

const Home = ({ images }) => {
  const [isLoading, setLoading] = useState(true)
  const [barProgress, setBarProgress] = useState(0)
  const [hideWords, setHideWords] = useState(false)

  useEffect(() => {
    if (barProgress > 0.01) {
      setLoading(false)
    }
    if (barProgress > 0.5) {
      setHideWords(true)
    }
  }, [barProgress])

  return (
    <>
      <div className="home">
        <div className="landing" style={{ background: "black" }}>
          <HomeVideo images={images} setBarProgress={setBarProgress} />
        </div>
        <Header title={"The Visiting Room Project"} classes="center" hideMenu />
        <div className={`landing fadeinfast`}>
          {
            null /*
          <div className="home-title-accent"></div>
          <div className="home-title">
            <span>The</span>
            <br />
            <span>Visting Room</span>
            <br />
            <span>Project</span>
            <br />
          </div> */
          }
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
        {isLoading ? (
          <div
            style={{
              position: "fixed",
              top: "var(--space-around-small)",
              right: "var(--space-around-small)",
              transform: "translate(30px, 0)",
            }}
          >
            <Loading size="small" />
          </div>
        ) : (
          <Skip barProgress={barProgress} />
        )}
      </div>
    </>
  )
}

export default Home
