import React from "react"

import "./Burger.css"

const Burger = ({ isBurgerOpen, setBurgerOpen }) => (
  <div
    className={`burger ${isBurgerOpen ? "is-active" : ""}`}
    onClick={() => {
      setBurgerOpen(!isBurgerOpen)
    }}
    style={{
      marginLeft: "20px",
      top: "-75px",
    }}
  >
    <div className="burger-inner"></div>
  </div>
)

export default Burger
