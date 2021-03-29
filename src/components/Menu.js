import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { useMediaQuery } from "react-responsive"

import Burger from "./Burger"

import "./Menu.css"

import { colors } from "../content/colors"

const Menu = ({ theme, fadein, isMenuExpanded = false, setMenuExpanded }) => {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  const [isTooltip, setTooltip] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  useEffect(() => {
    setBurgerOpen(isMenuExpanded)
  }, [isMenuExpanded])

  const getColor = idx => {
    //return colors[Math.floor(Math.random() * colors.length)]
    return colors[idx]
  }

  return (
    <>
      <div className="menu-button-tooltip">
        <div
          className={`menu-tooltip ${
            isTooltip && !isTabletOrMobile ? "active" : ""
          }`}
        >
          Menu
        </div>
        <button
          className={`menu menu-button 
          ${theme === "light" ? "menu-light" : ""}
          ${fadein ? "fadein" : ""}
        `}
          style={{
            padding: "10px 14px",
          }}
          onClick={() => {
            setBurgerOpen(!isBurgerOpen)
          }}
          onMouseEnter={() => {
            setTooltip(true)
          }}
          onMouseLeave={() => {
            setTooltip(false)
          }}
        >
          <Burger isBurgerOpen={isBurgerOpen} />
        </button>
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
              background: `var(${getColor(0)})`,
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
              background: `var(${getColor(1)})`,
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
              background: `var(${getColor(2)})`,
            }}
            onClick={() => {
              setBurgerOpen(false)
            }}
          >
            Archive
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link
            to="/about"
            className="hover-link"
            style={{
              background: `var(${getColor(5)})`,
            }}
            onClick={() => {
              setBurgerOpen(false)
            }}
          >
            About
          </Link>
        </div>
      </div>
    </>
  )
}

export default Menu
