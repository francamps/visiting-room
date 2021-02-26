import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"

import Grid from "../Grid"
import Header from "../Header"
import VisitingRoomBanner from "../HeaderBanner"

//import audio from "../../content/audio/stanfield/landingB.mp3"
import audio from "../../content/audio/stanfield/landingFull.mp3"

import "./VisitingRoom.css"

const VisitingRoom = ({ loading, profiles = [], images, ...props }) => {
  const [search, setSearch] = useState(null)

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
            <Header title="The Visiting Room" banner />
            <Grid searchTerm={search} profiles={profiles} images={images} />
          </>
        )}
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
