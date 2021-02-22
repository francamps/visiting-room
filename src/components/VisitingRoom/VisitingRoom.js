import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"

import Grid from "../Grid"
import Header from "../Header"
import VisitingRoomBanner from "./VisitingRoomBanner"

//import audio from "../../content/audio/stanfield/landingB.mp3"
import audio from "../../content/audio/stanfield/landingFull.mp3"

import "./VisitingRoom.css"

const VisitingRoom = ({ loading, profiles = [], images, ...props }) => {
  const [search, setSearch] = useState(null)

  const [showBanner, setShowBanner] = useState(
    // TODO: Save in localStore once viewed, and pull from there
    typeof window !== "undefined" &&
      window.localStorage.getItem("showVRBanner") === "false"
      ? false
      : true
  )
  const [showSound, setShowSound] = useState(false)

  useEffect(() => {
    let timerSound = setTimeout(() => {
      setShowSound(true)
    }, 2000)

    return () => {
      clearTimeout(timerSound)
    }
  }, [])

  console.log(showBanner)

  return (
    <div className="visiting-room-wrap container">
      <>
        {!loading && (
          <>
            <Header
              title="The Visiting Room"
              setTitleHelp={() => {
                window.localStorage.setItem("showVRBanner", "true")
                setShowBanner(true)
              }}
            />
            <Grid searchTerm={search} profiles={profiles} images={images} />
          </>
        )}
        <VisitingRoomBanner isShow={showBanner} setShowBanner={setShowBanner} />
        {showSound && (
          <ReactPlayer
            width="1px"
            height="1px"
            url={audio}
            volume={0.5}
            playing
            controls={false}
          />
        )}
      </>
    </div>
  )
}

export default VisitingRoom
