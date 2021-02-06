import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"

import Burger from "./Burger"

import "./Menu.css"

import { colors } from "../content/colors"

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
    <div style={{ width: "20px", marginLeft: "10px" }}>
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
              setBurgerOpen(false)
              if (typeof window !== "undefined") {
                navigate("/visiting-room")
              }
            }}
            className="hover-link"
            style={{
              background: `var(${
                colors[Math.floor(Math.random() * colors.length)]
              })`,
            }}
          >
            The Visiting Room
          </a>
        </div>
        <div className="menu-option-wrap">
          <Link
            to="/history"
            className="hover-link"
            style={{
              background: `var(${
                colors[Math.floor(Math.random() * colors.length)]
              })`,
            }}
            onClick={() => {
              setBurgerOpen(false)
            }}
          >
            History of Life Without Parole
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link
            to="/archive"
            className="hover-link"
            style={{
              background: `var(${
                colors[Math.floor(Math.random() * colors.length)]
              })`,
            }}
            onClick={() => {
              setBurgerOpen(false)
            }}
          >
            Full Archive
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link
            to="/about"
            className="hover-link"
            style={{
              background: `var(${
                colors[Math.floor(Math.random() * colors.length)]
              })`,
            }}
            onClick={() => {
              setBurgerOpen(false)
            }}
          >
            About
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Menu
