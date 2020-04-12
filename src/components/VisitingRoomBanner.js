import React, { useState } from "react"
import "./VisitingRoomBanner.css"
import { animated, useSpring } from "react-spring"

import FilterAndSearch from "./FilterAndSearch"
import Loading from "./Loading"

import IconSearch from "./Symbols/Search"

const VisitingRoomBanner = ({ showGrid, onSearchTyping }) => {
  const [openSearch, setOpenSearch] = useState(false)

  const props = useSpring({
    config: { duration: 1200, mass: 5, tension: 350, friction: 40 },
    to: { opacity: 1, marginTop: "0" },
    from: { opacity: 0, marginTop: "60px" },
  })

  return (
    <>
      <animated.div
        className={`visting-room-banner ${showGrid ? "in-grid" : ""}`}
        style={props}
      >
        {!showGrid && (
          <div className="who-header">
            <p>
              Louisiana has nearly 5,000 people serving life without parole.
            </p>
            <p>Here are some of their stories.</p>
            <Loading />
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
            {openSearch && (
              <div style={props}>
                <FilterAndSearch onSearchTyping={onSearchTyping} />
              </div>
            )}
          </div>
        )}
        {openSearch && (
          <div
            className="header-backdrop"
            onClick={() => setOpenSearch(false)}
          ></div>
        )}
      </animated.div>
    </>
  )
}

export default VisitingRoomBanner
