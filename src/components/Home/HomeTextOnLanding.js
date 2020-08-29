import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import "./HomeTextOnLanding.css"

const HomeTextOnLanding = ({
  setFadeOutLanding,
  setMenuExpanded,
  isMenuExpanded,
}) => {
  const [isActionsOpen, setActionsOpen] = useState(false)
  const [showMoreMenu, setVisibleMenu] = useState(false)
  const [isHover, setHover] = useState(false)

  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  useEffect(() => {
    if (!isActionsOpen && isMenuExpanded) {
      setActionsOpen(true)
    }
  }, [isMenuExpanded])

  useEffect(() => {
    if (!isActionsOpen) {
      let timerActions = setTimeout(() => {
        setActionsOpen(true)
        setMenuExpanded(true)
      }, 10000)

      return () => {
        clearTimeout(timerActions)
      }
    }
  }, [])

  useEffect(() => {
    if (!showMoreMenu && isActionsOpen) {
      let timerMenu = setTimeout(() => {
        setVisibleMenu(true)
      }, 2000)

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
          <button
            onMouseEnter={() => {
              setHover(true)
            }}
            onMouseLeave={() => {
              setHover(false)
            }}
          >
            Enter the visiting room
          </button>
        </Link>

        {showMoreMenu && (
          <ul className="fadein">
            <li>
              <Link to="/history">History of Life Without Parole</Link>
            </li>
            <li>
              <Link to="/archive">Full Archive</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
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
