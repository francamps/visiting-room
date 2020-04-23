import React, { useState } from "react"
import { Link, navigate } from "gatsby"

import Burger from "./Burger"

import "./Menu.css"

const Menu = ({ theme, isExpanded = false }) => {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  return (
    <div>
      <div className={`menu ${theme === "light" ? "menu-light" : ""}`}>
        <Burger isBurgerOpen={isBurgerOpen} setBurgerOpen={setBurgerOpen} />
        <h2 className="home-title" onClick={() => navigate("/")}>
          <span className="first-char">T</span>he{" "}
          <span className="first-char">V</span>isiting{" "}
          <span className="first-char">R</span>oom
        </h2>
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
        <Link to="/visiting-room">
          <div className="menu-option-wrap">
            <p className="hover-link">THE VISITING ROOM</p>
          </div>
        </Link>

        <div className="menu-option-wrap">
          <p
            className="hover-link"
            onClick={() => {
              navigate("/history")
            }}
          >
            HISTORY
          </p>
        </div>
        <div className="menu-option-wrap">
          <p
            className="hover-link"
            onClick={() => {
              navigate("/archive")
            }}
          >
            ARCHIVE
          </p>
        </div>
        <div className="menu-option-wrap">
          <p
            className="hover-link"
            onClick={() => {
              navigate("/about")
            }}
          >
            ABOUT THE PROJECT
          </p>
        </div>
      </div>
    </div>
  )
}

export default Menu
