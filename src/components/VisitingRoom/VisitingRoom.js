import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import Header from "../Header"
import VisitingRoomBanner from "./VisitingRoomBanner"
import Grid from "../Grid"

import "./VisitingRoom.css"

import audio from "../../content/audio/stanfield/landingB.mp3"

const VisitingRoom = ({ loading, profiles = [], images, ...props }) => {
  const [search, setSearch] = useState(null)

  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    if (showBanner) {
      let timer = setTimeout(() => {
        setShowBanner(false)
      }, 1200)

      return () => {
        clearTimeout(timer)
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
        <ReactPlayer
          width="1px"
          height="1px"
          url={audio}
          volume={1}
          playing
          controls={false}
        />
        {
          null /*<audio autoPlay>
          <source
            src={"./audio/landingB.mp3"}
            id="mp3Source"
            type="audio/mpeg"
          />
          <source
            src={"./audio/landingB.ogg"}
            id="oggSource"
            type="audio/ogg"
          />
          Your browser does not support the audio element.
        </audio>*/
        }
      </>
    </div>
  )
}

export default VisitingRoom
