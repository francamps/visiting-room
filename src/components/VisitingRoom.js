import React, { useEffect, useState } from "react"

import Menu from "./Menu"
import VisitingRoomBanner from "./VisitingRoomBanner"
import Grid from "./Grid"
import Video from "./Video"

import "./VisitingRoom.css"

const VisitingRoom = ({ loading, profiles, images }) => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )
  const [profileId, setProfile] = useState(params.get("profile"))
  const [search, setSearch] = useState(null)

  const [fadeout, setFadeOut] = useState(false)
  const [showGrid, setShowGrid] = useState(false)

  useEffect(() => {
    let timer1 = setTimeout(() => setFadeOut(true), 3000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  useEffect(() => {
    if (fadeout) {
      let timer2 = setTimeout(() => {
        setShowGrid(true)
        setFadeOut(false)
      }, 1200)

      return () => {
        clearTimeout(timer2)
      }
    }
  }, [fadeout])

  return (
    <div
      className={`visiting-room-wrap container ${showGrid ? "uncovered" : ""}`}
    >
      {!profileId ? (
        <>
          <Menu isExpanded={false} />
          {!loading && (
            <Grid
              searchTerm={search}
              profiles={profiles}
              images={images}
              setProfile={setProfile}
            />
          )}
          <VisitingRoomBanner
            fadeout={fadeout}
            showGrid={showGrid}
            onSearchTyping={setSearch}
          />
        </>
      ) : (
        <Video profileId={profileId} name={"Arthur Carter"} />
      )}
    </div>
  )
}

export default VisitingRoom
