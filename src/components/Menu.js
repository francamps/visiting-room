import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"

import Burger from "./Burger"
import Play from "./Play"
import Socials from "./Socials"

import "./Menu.css"

const Menu = ({
  theme,
  fadein,
  isMenuExpanded = false,
  setMenuExpanded,
  hideTitle,
}) => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )
  const [isBurgerOpen, setBurgerOpen] = useState(false)

  useEffect(() => {
    setBurgerOpen(isMenuExpanded)
  }, [isMenuExpanded])

  return (
    <div>
      <div
        className={`menu
          ${theme === "light" ? "menu-light" : ""}
          ${fadein ? "fadein" : ""}
        `}
      >
        <Burger isBurgerOpen={isBurgerOpen} setBurgerOpen={setBurgerOpen} />
        {isBurgerOpen ||
          (!hideTitle && (
            <h2
              className={`home-title ${isBurgerOpen ? "open" : ""}`}
              onClick={() => navigate("/")}
            >
              The Visiting Room
            </h2>
          ))}
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
        }`}
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
            className="hover-link"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "var(--space-around-xsmall)",
            }}
            onClick={() => {
              window.localStorage.setItem("showIntro", "true")
            }}
          >
            <Play />
            <span style={{ marginLeft: "12px" }}>
              Introduction: Life at Angola
            </span>
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link to="/history" className="hover-link">
            History
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link to="/archive" className="hover-link">
            Full Archive
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link to="/about" className="hover-link">
            About the project
          </Link>
        </div>

        {null /*<Socials />*/}
      </div>
    </div>
  )
}

export default Menu
