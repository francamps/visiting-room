import React from "react"
import "./VisitingRoomBanner.css"
import { animated, useSpring } from "react-spring"

import FilterAndSearch from "./FilterAndSearch"
import Loading from "./Loading"

const VisitingRoomBanner = ({ showGrid, setShowGrid }) => {
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
        <div className="who-header" onClick={() => setShowGrid(false)}>
          {!showGrid && (
            <>
              <p>
                Louisiana has nearly 5,000 people serving life without parole.
              </p>
              <p>Here are some of their stories.</p>
            </>
          )}
        </div>
        <div
          className="header-content"
          onWheel={() => {
            if (!showGrid) setShowGrid(true)
          }}
        >
          {showGrid && <FilterAndSearch />}
          {!showGrid && <Loading />}
        </div>
      </animated.div>
    </>
  )
}

export default VisitingRoomBanner
