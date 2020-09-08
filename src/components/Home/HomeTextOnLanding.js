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
  const [showMoreMenu, setShowMoreMenu] = useState(false)

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
      }, 1000)

      return () => {
        clearTimeout(timerActions)
      }
    }
  }, [])

  useEffect(() => {
    if (!showMoreMenu && isActionsOpen) {
      let timerMenu = setTimeout(() => {
        setShowMoreMenu(true)
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
            if (typeof window !== "undefined") {
              if (window.localStorage.getItem("showIntro") === "false") {
                navigate("/visiting-room")
              } else {
                navigate("/foreword")
              }
            }
          }}
        >
          Enter the visiting room
        </h1>
      </div>
      {
        null /*<div className="actions">
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
      </div>*/
      }
      <div
        className="subtitle"
        onClick={() => {
          //setFadeOutLanding(true)
        }}
      >
        <p>
          Louisiana has nearly 5,000 people sentenced to die in prison without
          any possibility of parole.
        </p>
        <p>Here are some of their stories, in their own words.</p>
      </div>
    </div>
  )
}

export default HomeTextOnLanding
