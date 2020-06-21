import React, { useState } from "react"
import { Link, navigate } from "gatsby"

import Burger from "./Burger"
import Play from "./Play"

import "./Menu.css"

const Menu = ({ theme, isExpanded = false, hideTitle }) => {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  return (
    <div>
      <div className={`menu ${theme === "light" ? "menu-light" : ""}`}>
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
          <Link to="/visiting-room" className="hover-link">
            The Visiting Room
          </Link>
        </div>

        <div className="menu-option-wrap">
          <Link to="/history" className="hover-link">
            History
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link to="/archive" className="hover-link">
            Archive
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link to="/about" className="hover-link">
            About the project
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link
            to="/visiting-room"
            className="hover-link"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Play size="large" />
            <span style={{ marginLeft: "12px" }}>LWOP at Angola</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Menu
