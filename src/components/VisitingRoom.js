import React, { useEffect, useState } from "react"

import Menu from "./Menu"
import VisitingRoomBanner from "./VisitingRoomBanner"
import Grid from "./Grid"
import Video from "./Video"

import "./VisitingRoom.css"

const VisitingRoom = ({ pageContext = { profileId: null } }) => {
  const { profileId } = pageContext
  const [showGrid, setShowGrid] = useState(false)

  useEffect(() => {
    let timer1 = setTimeout(() => setShowGrid(true), 3000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  return (
    <div
      className={`visiting-room-wrap container ${showGrid ? "uncovered" : ""}`}
      onScroll={() => {
        if (!showGrid) setShowGrid(true)
      }}
    >
      <Menu isExpanded={false} />
      {showGrid && <Grid />}
      <VisitingRoomBanner showGrid={showGrid} setShowGrid={setShowGrid} />
      {profileId && (
        <Video profileId={"arthur_carter"} name={"Arthur Carter"} />
      )}
    </div>
  )
}

export default VisitingRoom
