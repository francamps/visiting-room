import React, { useState } from "react"
import "./VisitingRoomBanner.css"

import FilterAndSearch from "./FilterAndSearch"
import Loading from "./Loading"

import IconSearch from "./Symbols/Search"

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
        {showGrid && (
          <div className={`header-content ${openSearch ? "open" : ""} `}>
            {!openSearch && (
              <div
                className="search-trigger"
                onClick={() => {
                  setOpenSearch(true)
                }}
              >
                <IconSearch />
              </div>
            )}
            {openSearch && <FilterAndSearch onSearchTyping={onSearchTyping} />}
          </div>
        )}
        {openSearch && (
          <div
            className="header-backdrop"
            onClick={() => setOpenSearch(false)}
          ></div>
        )}
      </div>
    </>
  )
}

export default VisitingRoomBanner
