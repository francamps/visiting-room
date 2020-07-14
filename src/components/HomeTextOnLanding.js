import React from "react"
import { Link } from "gatsby"

import "./HomeTextOnLanding.css"
import EnterIcon from "./Symbols/EnterIcon"
import Play from "./Play"

const HomeTextOnLanding = ({ setFadeOutLanding }) => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  return (
    <div className="text-on-landing">
      <Link
        to="/"
        onClick={() => {
          setFadeOutLanding(true)
        }}
      >
        <div className="title">
          The Visiting Room
          <div className="primary-action" style={{ display: "inline-block" }}>
            <h2>
              Enter
              <div className="icon">
                <EnterIcon />
              </div>
            </h2>
          </div>
        </div>
      </Link>
      <div
        className="subtitle"
        onClick={() => {
          setFadeOutLanding(true)
        }}
      >
        <p>
          A series of life-history interviews with people who are sentenced to
          die in prison without any possibility of parole.
        </p>
        <p>
          All interviews were filmed at the Louisiana State Penitentiary,
          Angola.
        </p>
      </div>

      <div className="buttons">
        <a href="#">
          <div
            className="button"
            onClick={() => {
              params.set("visiting", true)
            }}
          >
            <div className="link-wrap">
              <Play />
              <span className="hover-link" style={{ marginLeft: "8px" }}>
                <h3>What is Life Without Parole</h3>
              </span>
            </div>
          </div>
        </a>
        <Link to="/history">
          <div className="button">
            <div className="link-wrap">
              <span className="hover-link">
                <h3>How did we get here?</h3>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default HomeTextOnLanding
