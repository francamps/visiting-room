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
        className=""
        style={{
          ...props,
          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: !isGrid ? "center" : "start",
          flexDirection: "column",
          width: "100%",
          height: isGrid ? "340px" : "100%",
          boxSizing: "border-box",
          padding: "50px 20px",
          transition: "align-items 1.2s, width 1.2s, height 1.2s",
        }}
      >
        <div
          className="who-header"
          style={{
            fontFamily: "GTSpectra",
            fontSize: isGrid ? "24px" : "36px",
            transition: "font-size 1.2s",
          }}
          onClick={() => setGrid(false)}
        >
          Who did you come to visit?
        </div>
        <div className="header-content" style={{}}>
          <div
            className={`header-options ${isGrid ? "in-grid" : ""}`}
            style={{
              paddingBottom: !isGrid ? "8px" : "0",
              paddingTop: !isGrid ? "8px" : "0",
              borderBottom: !isGrid ? "1px solid #444444" : "none",
            }}
          >
            <div
              className="header-option search"
              style={{
                flexDirection: isGrid ? "row" : "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isGrid && <p>Search</p>}
              <IconSearch />
              {() => {
                if (!isGrid) return null

                return (
                  <div
                    style={{
                      width: "100px",
                      height: "14px",
                      marginLeft: "4px",
                      borderBottom: "1px solid #888888",
                    }}
                  ></div>
                )
              }}
            </div>
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
