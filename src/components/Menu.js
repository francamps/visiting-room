import React, { useState } from "react"
import { Link, navigate } from "gatsby"

import Burger from "./Burger"

import "./Menu.css"

const Menu = ({ theme, isExpanded = false }) => {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  return (
    <>
      <div className={`menu ${theme === "light" ? "menu-light" : ""}`}>
        <h2 className="home-title" onClick={() => navigate("/")}>
          The Visiting Room
        </h2>
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
        }`}
      >
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/visiting-room">
          <p>The Visiting Room</p>
        </Link>
        <p
          onClick={() => {
            navigate("/timeline")
          }}
        >
          History
        </p>
        <p
          onClick={() => {
            navigate("/about")
          }}
        >
          About The Project
        </p>
        <p
          onClick={() => {
            navigate("/about")
          }}
        >
          Archive
        </p>
      </div>
    </>
  )
}

export default Menu
