import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"

import HomeVideo from "./HomeVideo"
import HomeTextOnLanding from "./HomeTextOnLanding"

import "./Home.css"

const Home = () => {
  const [fadeoutLanding, setFadeOutLanding] = useState(false)
  const [fadeoutMenu, setVisibleMenu] = useState(false)

  const [isMenuExpanded, setMenuExpanded] = useState(false)

  useEffect(() => {
    if (!fadeoutMenu) {
      let timerMenu = setTimeout(() => {
        setVisibleMenu(true)
      }, 12000)

      return () => {
        clearTimeout(timerMenu)
      }
    }
  }, [])

  useEffect(() => {
    let timerGoOff = setTimeout(() => {
      navigate("/visiting-room")
    }, 300000)

    return () => {
      clearTimeout(timerGoOff)
    }
  }, [])

  return (
    <>
      <p className={`tap-hint ${isMenuExpanded ? "fadeout" : ""}`} style={{}}>
        Tap anywhere to start
      </p>
      <div className={`home ${fadeoutLanding ? "fadeout" : ""}`}>
        <div
          className="landing"
          onClick={() => {
            console.log("this is happening")
            if (!isMenuExpanded) {
              setMenuExpanded(true)
            }
          }}
        >
          <HomeVideo setMenuExpanded={setMenuExpanded} />
          <HomeTextOnLanding
            setFadeOutLanding={setFadeOutLanding}
            isMenuExpanded={isMenuExpanded}
            setMenuExpanded={setMenuExpanded}
          />
        </div>
      </div>
    </>
  )
}

export default Home
