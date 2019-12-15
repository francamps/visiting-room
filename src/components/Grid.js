import React, { useState } from "react"
import { navigate } from "gatsby"
import { animated, useSpring } from "react-spring"

import "./Grid.css"

import { PROFILES } from "../content/profiles"
import GridImage from "./GridImage"

const Grid = () => {
  const [isHover, setHover] = useState(null)
  const fadeInProps = useSpring({
    config: { duration: 2000 },
    to: { opacity: 1, filter: "blur(0)" },
    from: {
      opacity: 0,
      filter: "blur(1.5rem)",
    },
  })

  return (
    <animated.div
      className="grid"
      style={{
        ...fadeInProps,
        position: "absolute",
        width: "calc(100% - 60px)",
        left: "60px",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: 0,
        gridAutoRows: "428px",
        padding: "160px 0",
        boxSizing: "border-box",
      }}
    >
      {PROFILES.map((profile, idx) => {
        return (
          <div
            className={`grid-cell ${idx === isHover ? "hovered" : ""}`}
            onMouseEnter={() => {
              setHover(idx)
            }}
            onMouseLeave={() => {
              setHover(null)
            }}
            onClick={() => {
              navigate(`/visiting-room/${"arthur-carter"}`)
            }}
          >
            <div className="cell-background">
              <GridImage path={profile.imagePath} />
            </div>
            <div className="cell-hover-layer"></div>
            <div className="cell-hover-quote">
              <p className="quote">{profile.quote}</p>
            </div>
            <h3
              style={{
                fontFamily: "GTSpectra",
                letterSpacing: idx === isHover ? "0.03em" : "normal",
                transition: "letter-spacing 2s",
                paddingLeft: "20px",
                borderLeft: "1px solid white",
                boxSizing: "border-box",
                marginLeft: "20px",
                textAlign: "left",
                width: "calc(100% - 40px)",
                position: "absolute",
                alignSelf: "flex-start",
              }}
            >
              {profile.name}
            </h3>
          </div>
        )
      })}
    </animated.div>
  )
}

export default Grid
