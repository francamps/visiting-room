import React from "react"
import { navigate } from "gatsby"

import "./Skip.css"

const Skip = ({ barProgress }) => {
  return (
    <div className="skip">
      <div className="skip-bar">
        <div
          className="skip-bar-bg"
          role="button"
          aria-label="Seek time in video"
        />
        <div
          className="skip-bar-played"
          role="button"
          style={{
            width: 30 * barProgress + "px",
          }}
        />
      </div>
      <p
        className="skip-label"
        onClick={() => {
          navigate("/visiting-room")
        }}
      >
        Skip intro
      </p>
    </div>
  )
}

export default Skip
