import React, { useState } from "react"

import Loading from "../Loading"

import "./VisitingRoomBanner.css"

const VisitingRoomBanner = ({ showGrid, fadeout, onSearchTyping }) => {
  const [openSearch, setOpenSearch] = useState(false)

  return (
    <>
      <div
        className={`visting-room-banner ${showGrid ? "in-grid" : ""} ${
          fadeout ? "fadeout" : ""
        }`}
      >
        {!showGrid && (
          <div className="visiting-room-entry-text">
            <p>
              All the following life-story interviews were filmed at the
              Louisiana State Penitentiary, Angola.
            </p>
            <Loading />
          </div>
        )}
      </div>
    </>
  )
}

export default VisitingRoomBanner
