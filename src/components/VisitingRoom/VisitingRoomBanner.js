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
              Louisiana has nearly 5,000 people serving life without parole.
            </p>
            <p>Here are some of their stories.</p>
            <Loading />
          </div>
        )}
      </div>
    </>
  )
}

export default VisitingRoomBanner
