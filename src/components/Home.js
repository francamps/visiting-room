import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import Menu from "./Menu"
import HomeVideo from "./HomeVideo"
import HomeTextOnLanding from "./HomeTextOnLanding"
import VisitingRoom from "../components/VisitingRoom"

import "./Home.css"

const Home = ({ loading, profiles, images }) => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )
  const [fadeoutLanding, setFadeOutLanding] = useState(false)
  const [fadeoutMenu, setVisibleMenu] = useState(false)
  const [isVisitingRoom, setVisitingRoom] = useState(
    params.get("visiting") || false
  )
  const [isMenuExpanded, setMenuExpanded] = useState(false)

  useEffect(() => {
    if (fadeoutLanding) {
      let timer1 = setTimeout(() => {
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params}`
        )
        setVisitingRoom(true)
        setFadeOutLanding(false)
      }, 1200)

      return () => {
        clearTimeout(timer1)
      }
    }
  }, [fadeoutLanding, params])

  useEffect(() => {
    if (!fadeoutMenu) {
      let timerMenu = setTimeout(() => {
        setVisibleMenu(true)
      }, 6000)

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
      {fadeoutMenu && <Menu fadein isMenuExpanded={isMenuExpanded} hideTitle />}
      <div className={`home ${fadeoutLanding ? "fadeout" : ""}`}>
        <div className="landing">
          <HomeVideo />
          <HomeTextOnLanding
            setFadeOutLanding={setFadeOutLanding}
            setMenuExpanded={setMenuExpanded}
          />
        </div>
      </div>
    </>
  )
}

export default Home
