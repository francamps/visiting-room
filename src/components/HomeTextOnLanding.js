import React, { useState } from "react"
import { Link } from "gatsby"

import "./HomeTextOnLanding.css"
import EnterIcon from "./Symbols/EnterIcon"
import Play from "./Play"
import Burger from "./Burger"

const HomeTextOnLanding = ({ setFadeOutLanding, setMenuExpanded }) => {
  const [isActionsOpen, setActionsOpen] = useState(false)

  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  return (
    <div className="text-on-landing">
      <div
        className="title"
        onClick={() => {
          setActionsOpen(true)
        }}
      >
        The Visiting Room
        <div
          className={`primary-action ${isActionsOpen ? "active" : ""}`}
          style={{ display: "inline-block" }}
        >
          <Link
            to="/"
            onClick={() => {
              setFadeOutLanding(true)
              params.set("visiting", true)
            }}
          >
            <h2>
              Enter
              <div className="icon">
                <EnterIcon />
              </div>
            </h2>
          </Link>
          <Link
            to="/"
            onClick={() => {
              setFadeOutLanding(true)
              params.set("visiting", true)
            }}
          >
            <h2>
              Entry with introduction
              <div className="icon">
                <span style={{ marginRight: "16px" }}>
                  <Play />
                </span>
                <EnterIcon />
              </div>
            </h2>
          </Link>

          <h2
            onClick={() => {
              console.log("yo")
              setMenuExpanded(true)
            }}
          >
            Explore the site
            <div className="icon">
              <Burger />
            </div>
          </h2>
        </div>
      </div>
      <div
        className={`subtitle ${isActionsOpen ? "hidden" : ""}`}
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
    </div>
  )
}

export default HomeTextOnLanding
