import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"

import Grid from "../Grid"
import Header from "../Header"

import audio from "../../content/audio/stanfield/landingFull.mp3"

import "./VisitingRoom.css"

const VisitingRoom = ({ loading, profiles = [], images, ...props }) => {
  const [isShowBanner, setShowBanner] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("showBanner__VISITING-ROOM") === "true"
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

  return (
    <div className="visiting-room-wrap container">
      <>
        {!loading && (
          <>
            <Header
              title="The Visiting Room"
              banner="VISITING-ROOM"
              onSetShowBanner={setShowBanner}
            />
            <Grid
              profiles={profiles}
              images={images}
              isLoadBackgrounds={!isShowBanner}
            />
          </>
        )}
        {showSound && null && (
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
