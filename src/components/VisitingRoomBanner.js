import React from "react"
import "./VisitingRoomBanner.css"
import { animated, useSpring } from "react-spring"

//import BulletScroll from "./BulletScroll"
import Play from "./Play"
import Caret from "./Caret"
import IconSearch from "./Symbols/Search"

const VisitingRoomBanner = ({ showGrid, setGrid }) => {
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
        <div className="who-header" onClick={() => setGrid(false)}>
          {showGrid ? (
            <p>Who would you like to talk to?</p>
          ) : (
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
            if (!showGrid) setGrid(true)
          }}
        >
          <div className="header-options">
            {showGrid && (
              <div className="header-option search">
                <IconSearch />
                <p className="search-input">Search</p>
              </div>
            )}

            {showGrid && (
              <div className="header-option">
                <p className="search-input">Filter by parrish</p>
              </div>
            )}
            {showGrid && (
              <div className="header-option">
                <p className="search-input">Filter by age</p>
              </div>
            )}
            {!showGrid && (
              <div
                className="header-option"
                onClick={() => {
                  setGrid(true)
                }}
              >
                <p>Scroll</p>
                <Caret direction="down" animate={true} />
              </div>
            )}
            {!showGrid && (
              <div className="header-option everyone">
                <div>
                  <div
                    style={{
                      padding: "10px",
                      display: "inline-block",
                    }}
                  >
                    All
                  </div>
                  <div
                    style={{
                      paddingLeft: "8px",
                      display: showGrid ? "inline" : "block",
                    }}
                  >
                    <Play size={showGrid ? "small" : "normal"} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </animated.div>
    </>
  )
}

export default VisitingRoomBanner
