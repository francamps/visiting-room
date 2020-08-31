import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import "./HomeTextOnLanding.css"

import Play from "../Symbols/Play"

const HomeTextOnLanding = ({
  setFadeOutLanding,
  setMenuExpanded,
  isMenuExpanded,
}) => {
  const [isActionsOpen, setActionsOpen] = useState(false)
  const [showMoreMenu, setVisibleMenu] = useState(false)

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
      }, 500)

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
        <h1
          onClick={() => {
            if (typeof window !== "undefined")
              window.localStorage.setItem("showIntro", "true")
            navigate("/visiting-room")
          }}
        >
          The Visiting Room
        </h1>
      </div>
      <div className="actions">
        {showMoreMenu && (
          <ul className="fadein">
            <li>
              <Link
                to="/visiting-room"
                onClick={() => {
                  if (typeof window !== "undefined")
                    window.localStorage.setItem("showIntro", "true")
                }}
              >
                <Play useCircle={false} />
                Foreword
              </Link>
            </li>
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
