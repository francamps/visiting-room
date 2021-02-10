import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import Header from "../Header"
import VisitingRoomBanner from "./VisitingRoomBanner"
import Grid from "../Grid"

import "./VisitingRoom.css"

//import audio from "../../content/audio/stanfield/landingB.mp3"
import audio from "../../content/audio/stanfield/landingFull.mp3"

const VisitingRoom = ({ loading, profiles = [], images, ...props }) => {
  const [search, setSearch] = useState(null)

  const [showBanner, setShowBanner] = useState(true)
  const [showSound, setShowSound] = useState(false)

  useEffect(() => {
    let timerSound = setTimeout(() => {
      setShowSound(true)
    }, 2000)

    if (showBanner) {
      let timer = setTimeout(() => {
        setShowBanner(false)
      }, 1200)

      return () => {
        clearTimeout(timer)
        clearTimeout(timerSound)
      }
    }
  }, [])

  return (
    <div className="visiting-room-wrap container">
      <>
        {!loading && !showBanner && (
          <>
            <Header title="The Visiting Room" />
            <Grid searchTerm={search} profiles={profiles} images={images} />
          </>
        )}
        <VisitingRoomBanner isShow={loading} onSearchTyping={setSearch} />
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
