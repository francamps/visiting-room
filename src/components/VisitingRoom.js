import React, { useEffect, useState } from "react"

import Menu from "./Menu"
import VisitingRoomBanner from "./VisitingRoomBanner"
import Grid from "./Grid"
import Video from "./Video"

import "./VisitingRoom.css"

const VisitingRoom = ({ loading, profiles, images }) => {
  const params = new URLSearchParams(window.location.search)
  const [profileId, setProfile] = useState(params.get("profile"))
  const [showGrid, setShowGrid] = useState(false)
  const [search, setSearch] = useState(null)

  useEffect(() => {
    let timer1 = setTimeout(() => setShowGrid(true), 3000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  return (
    <div
      className={`visiting-room-wrap container ${showGrid ? "uncovered" : ""}`}
    >
      {!profileId && <Menu isExpanded={false} />}
      {!loading && showGrid && !profileId && (
        <Grid
          searchTerm={search}
          profiles={profiles}
          images={images}
          setProfile={setProfile}
        />
      )}
      {!profileId && (
        <VisitingRoomBanner showGrid={showGrid} onSearchTyping={setSearch} />
      )}
      {profileId && <Video profileId={profileId} name={"Arthur Carter"} />}
    </div>
  )
}

export default VisitingRoom
