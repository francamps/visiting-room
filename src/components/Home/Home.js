import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"

import HomeVideo from "./HomeVideo"
import HomeTextOnLanding from "./HomeTextOnLanding"
import Header from "../Header"

import "./Home.css"

const Home = ({ images }) => {
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

  return (
    <>
      {
        null /*<p className={`tap-hint ${isMenuExpanded ? "fadeout" : ""}`} style={{}}>
        Tap anywhere to start
      </p>*/
      }
      <Header hideTitle />
      <div className={`home ${fadeoutLanding ? "fadeout" : ""}`}>
        <div
          className="landing"
          onClick={() => {
            if (!isMenuExpanded) {
              setMenuExpanded(true)
            }
          }}
        >
          <HomeVideo setMenuExpanded={setMenuExpanded} images={images} />
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
