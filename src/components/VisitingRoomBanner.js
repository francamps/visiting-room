import React from "react"
import "./VisitingRoomBanner.css"
import { animated, useSpring } from "react-spring"

//import BulletScroll from "./BulletScroll"
import Play from "./Play"
import Caret from "./Caret"
import IconSearch from "./Symbols/Search"

const VisitingRoomBanner = ({ isGrid, setGrid }) => {
  const props = useSpring({
    config: { duration: 1200, mass: 5, tension: 350, friction: 40 },
    to: { opacity: 1, marginTop: "0" },
    from: { opacity: 0, marginTop: "60px" },
  })

  return (
    <>
      <animated.div
        className={`visting-room-banner ${isGrid ? "in-grid" : ""}`}
        style={{
          ...props,
          justifyContent: !isGrid ? "center" : "start",
        }}
      >
        <div className="who-header" onClick={() => setGrid(false)}>
          Who did you come to visit?
        </div>
        <div
          className="header-content"
          onWheel={() => {
            console.log("lol")
            if (!isGrid) setGrid(true)
          }}
        >
          <div
            className="header-options"
            style={{
              paddingBottom: !isGrid ? "8px" : "0",
              paddingTop: !isGrid ? "8px" : "0",
              borderBottom: !isGrid ? "1px solid #444444" : "none",
            }}
          >
            <div className="header-option search">
              <IconSearch />
              {isGrid && <p className="search-input">Search</p>}
            </div>

            {isGrid && (
              <div className="header-option">
                <p className="search-input">Filter by parrish</p>
              </div>
            )}
            {isGrid && (
              <div className="header-option">
                <p className="search-input">Filter by age</p>
              </div>
            )}
            {!isGrid && (
              <div
                className="header-option"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isGrid ? "start" : "center",
                }}
                onClick={() => {
                  setGrid(true)
                }}
              >
                <p>Scroll</p>
                <Caret direction="down" animate={true} />
              </div>
            )}
            {!isGrid && (
              <div
                className="header-option everyone"
                style={{
                  flexDirection: isGrid ? "row" : "column",
                  alignItems: "center",
                }}
              >
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
                      display: isGrid ? "inline" : "block",
                    }}
                  >
                    <Play size={isGrid ? "small" : "normal"} />
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
