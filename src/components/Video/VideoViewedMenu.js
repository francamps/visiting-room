import React from "react"
import { navigate } from "gatsby"

import "./VideoViewedMenu.css"

const VideoViewedMenu = ({ name, color, nextProfile }) => {
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
          <div className="" style={{ color: color }}>
            {name}
          </div>
          <div className="" style={{ color: "var(--clr-off-white)" }}>
            21 years old at the time of the offence (TBD)
          </div>
          <div className="" style={{ color: "var(--clr-off-white)" }}>
            39 years in prision at the time of the interview (TBD)
          </div>
        </div>
      </div>
      <div
        style={{
          width: "240px",
          height: "80px",
          position: "fixed",
          bottom: "80px",
          right: "20px",
          padding: "10px",
          border: "1px solid var(--clr-white)",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          cursor: "pointer",
        }}
        className="fadein"
        onClick={() => {
          const profileUri = nextProfile.full_name.text
            .toLowerCase()
            .replace(/ /g, "_")
          navigate(`/visiting-room/${profileUri}`)
        }}
      >
        <p style={{ margin: 0, fontSize: "var(--font-small)" }}>Next visit</p>
        {nextProfile && (
          <p
            style={{
              margin: 0,
              fontFamily: "EB Garamond",
              fontSize: "var(--font-copy)",
            }}
          >
            {nextProfile.full_name.text}
          </p>
        )}
      </div>
    </>
  )
}

export default VideoViewedMenu
