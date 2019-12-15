import React, { useState } from "react"
import { navigate } from "gatsby"
import { animated, useSpring } from "react-spring"

import "./Grid.css"

import { PROFILES } from "../content/profiles"
import image0 from "../images/TEMP/ARTHUR.jpg"
import image1 from "../images/TEMP/WALTER.jpg"
import image2 from "../images/TEMP/JEFFREY.png"
import image3 from "../images/TEMP/JARRED.jpg"
import image4 from "../images/TEMP/ARCHIE.jpg"
import image5 from "../images/TEMP/DARNELL.jpg"
import image6 from "../images/TEMP/DARYL.jpg"
import image7 from "../images/TEMP/KAUNTAU.jpg"
import image8 from "../images/TEMP/KENNETH.jpg"
import image9 from "../images/TEMP/TERRENCE.jpg"
import image10 from "../images/TEMP/PATRICK.jpg"
import image11 from "../images/TEMP/ANTHONY.jpg"

const images = [
  image0,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
]

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
            <div
              className="cell-background"
              style={{
                background: `url(${images[idx]}) center center`,
                backgroundSize: "cover",
              }}
            ></div>
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
