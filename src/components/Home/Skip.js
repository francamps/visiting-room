import React from "react"
import { navigate } from "gatsby"

import MenuButton from "../MenuButton"

import "./Skip.css"

const Skip = ({ barProgress }) => {
  return (
    <div className="menu-buttons fadeinfast" style={{ zIndex: 12 }}>
      <MenuButton
        buttonContent={
          <span
            style={{
              fontSize: "var(--font-xsmall)",
              fontFamily: "Roboto, Helvetica Neue, Arial, sans-serif",
            }}
          >
            Skip
          </span>
        }
        onClick={() => {
          navigate("/visiting-room")
        }}
        styling={{
          flexDirection: "column-reverse",
        }}
        tooltipActive
        tooltipStyling={{
          background: "none",
          boxShadow: "none",
          marginRight: 0,
        }}
        tooltipContent={
          <div className="skip-bar" style={{ width: "40px" }}>
            <div
              className="skip-bar-bg"
              role="button"
              aria-label="Seek time in video"
            />
            <div
              className="skip-bar-played"
              role="button"
              aria-label="Seek time in video"
              style={{
                width: 40 * barProgress + "px",
              }}
            />
          </div>
        }
      />
    </div>
  )
}

export default Skip
