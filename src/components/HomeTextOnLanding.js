import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import "./HomeTextOnLanding.css"
import EnterIcon from "./Symbols/EnterIcon"
import Play from "./Play"
import Burger from "./Burger"

const HomeTextOnLanding = ({ setFadeOutLanding, setMenuExpanded }) => {
  const [isActionsOpen, setActionsOpen] = useState(false)
  const [showMoreMenu, setVisibleMenu] = useState(false)

  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  useEffect(() => {
    if (!isActionsOpen) {
      let timerActions = setTimeout(() => {
        setActionsOpen(true)
      }, 4000)

      return () => {
        clearTimeout(timerActions)
      }
    }
  }, [])

  useEffect(() => {
    if (!showMoreMenu && isActionsOpen) {
      let timerMenu = setTimeout(() => {
        setVisibleMenu(true)
      }, 4000)

      return () => {
        clearTimeout(timerMenu)
      }
    }
  }, [isActionsOpen])

  return (
    <div
      className={`text-on-landing ${isActionsOpen ? "active" : ""}`}
      onClick={() => {
        setActionsOpen(true)
      }}
    >
      <div className="title">
        <h1>The Visiting Room</h1>
      </div>
      <div className="actions">
        <Link to="/visiting-room">
          <button>
            Enter
            <div className="icon">
              <EnterIcon />
            </div>
          </button>
        </Link>

        {showMoreMenu && (
          <ul className="fadein">
            Explore the site
            <li>History</li>
            <li>Full Archive</li>
            <li>About the project</li>
          </ul>
        )}
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
