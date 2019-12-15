import React, { useState } from "react"
import { Link, navigate } from "gatsby"

import Burger from "./Burger"

import "./Menu.css"

const Menu = ({ isExpanded = false }) => {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  return (
    <>
      <div
        className="menu"
        style={{
          cursor: "pointer",
          width: "50px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 12,
        }}
      >
        <h2
          className="home-title"
          style={{
            display: "inline",
            width: "200px",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            background: "none",
            zIndex: 12,
          }}
          onClick={() => navigate("/")}
        >
          THE VISITING ROOM
        </h2>
        <Burger isBurgerOpen={isBurgerOpen} setBurgerOpen={setBurgerOpen} />
      </div>
      <div
        className="menu-options"
        style={{
          cursor: "pointer",
          width: "400px",
          height: "100vh",
          position: "fixed",
          left: isExpanded || isBurgerOpen ? "50px" : "-400px",
          display: "flex",
          paddingLeft: "20px",
          zIndex: 11,
          flexDirection: "column",
          justifyContent: "center",
          //alignItems: "center",

          opacity: isExpanded || isBurgerOpen ? 1 : 0,
          transition: "opacity 0.4s, left 0.4s",
        }}
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
