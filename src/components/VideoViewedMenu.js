import React from "react"
import { navigate } from "gatsby"

import "./VideoViewedMenu.css"
import TimeSlider from "./TimeSlider"

const VideoViewedMenu = ({ profile }) => {
  return (
    <>
      <div
        className="final-card options"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          fontFamily: "EB Garamond",
          fontSize: "3rem",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
        }}
      >
        <div>
          <div className="" style={{ color: "rgb(234, 231, 150)" }}>
            David Chenevert
          </div>
          <div className="" style={{ color: "var(--clr-off-white)" }}>
            21 years old at the time of the offence
          </div>
          <div className="" style={{ color: "var(--clr-off-white)" }}>
            39 years in prision at the time of the interview
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoViewedMenu
