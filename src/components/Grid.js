import React, { useState } from "react"
import { navigate } from "gatsby"
import { animated, useSpring } from "react-spring"

import "./Grid.css"

import { profiles } from "../content/profiles_all"
import GridImage from "./GridImage"

const Grid = () => {
  const [isHover, setHover] = useState(null)
  const fadeInProps = useSpring({
    config: { duration: 2000 },
    to: { opacity: 1 /*, filter: "blur(0)"*/ },
    from: {
      opacity: 0,
      //filter: "blur(1.5rem)",
    },
  })

  return (
    <animated.div
      className="grid"
      style={{
        ...fadeInProps,
      }}
    >
      {profiles.map((profile, idx) => {
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
              <p className="quote">{`"${profile.quote}"`}</p>
            </div>
            <h3
              className="name-tag"
              style={{
                letterSpacing: idx === isHover ? "0.03em" : "normal",
              }}
            >
              {profile.name}
            </h3>
          </div>
        )
      })}
      {
        null /*<div style={{ width: "100%" }}>
        <h2>
          There are close to 5000 people serving life without parole in
          Louisiana. These are only some of the stories.
        </h2>
        <h2>Learn more at...</h2>
    </div>*/
      }
    </animated.div>
  )
}

export default Grid
