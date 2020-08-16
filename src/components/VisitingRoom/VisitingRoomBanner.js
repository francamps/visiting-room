import React, { useState } from "react"

import FilterAndSearch from "../FilterAndSearch"
import IconSearch from "../Symbols/Search"

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
            {null /*<Loading />*/}
          </div>
        )}
      </div>
    </>
  )
}

export default VisitingRoomBanner
