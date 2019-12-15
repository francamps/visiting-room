import React, { useState } from "react"

import Menu from "./Menu"
import VisitingRoomBanner from "./VisitingRoomBanner"
import Grid from "./Grid"
import Video from "./Video"

import "./VisitingRoom.css"

const VisitingRoom = ({ pageContext = { profileId: null } }) => {
  const [isGrid, setGrid] = useState(false)
  const { profileId } = pageContext

  return (
    <div
      className={`visiting-room-wrap container ${isGrid ? "uncovered" : ""}`}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Menu isExpanded={false} />
      {isGrid && <Grid />}
      <VisitingRoomBanner isGrid={isGrid} setGrid={setGrid} />
      {profileId && (
        <Video profileId={"arthur_carter"} name={"Arthur Carter"} />
      )}
    </div>
  )
}

export default VisitingRoom
