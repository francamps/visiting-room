import React, { useEffect, useState } from "react"

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

  console.log("yo", isMenuExpanded)

  return (
    <>
      <Menu isMenuExpanded={isMenuExpanded} hideTitle />
      {!isVisitingRoom ? (
        <div className={`home ${fadeoutLanding ? "fadeout" : ""}`}>
          <div className="landing">
            <HomeVideo />
            <HomeTextOnLanding
              setFadeOutLanding={setFadeOutLanding}
              setMenuExpanded={setMenuExpanded}
            />
          </div>
        </div>
      ) : (
        <VisitingRoom
          loading={loading}
          profiles={Object.values(profiles).filter(
            p => p.show_profile_in_visiting_room
          )}
          images={images}
        />
      )}
    </>
  )
}

export default Home
