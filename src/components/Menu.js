import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"

import Burger from "./Burger"
import Play from "./Symbols/Play"

import "./Menu.css"

const Menu = ({
  theme,
  fadein,
  isMenuExpanded = false,
  setMenuExpanded,
  hideTitle,
}) => {
  const [isBurgerOpen, setBurgerOpen] = useState(false)

  useEffect(() => {
    setBurgerOpen(isMenuExpanded)
  }, [isMenuExpanded])

  return (
    <div style={{ width: "20px", marginLeft: "20px" }}>
      <div
        className={`menu
          ${theme === "light" ? "menu-light" : ""}
          ${fadein ? "fadein" : ""}
        `}
      >
        <Burger isBurgerOpen={isBurgerOpen} setBurgerOpen={setBurgerOpen} />
      </div>
      <div
        className={`menu-backdrop ${isBurgerOpen ? "menu-backdrop-on" : ""}`}
        onClick={() => {
          setBurgerOpen(false)
        }}
      />
      <div
        className={`menu-options ${isBurgerOpen ? "open" : ""} ${
          theme === "light" ? "menu-light" : ""
        } ${isBurgerOpen ? "fadein" : ""}`}
        onClick={() => {
          setBurgerOpen(false)
        }}
      >
        <div className="menu-option-wrap">
          <a
            onClick={() => {
              navigate("/visiting-room")
            }}
            className="hover-link"
          >
            The Visiting Room
          </a>
        </div>
        <div className="menu-option-wrap">
          <Link
            to="/visiting-room"
            className="hover-link hover-link-intro"
            onClick={() => {
              if (typeof window !== "undefined")
                window.localStorage.setItem("showIntro", "true")
            }}
          >
            <Play />
            <span style={{ marginLeft: "12px" }}>Foreword</span>
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link to="/history" className="hover-link">
            History of Life Without Parole
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link to="/archive" className="hover-link">
            Full Archive
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link to="/about" className="hover-link">
            About
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Menu
