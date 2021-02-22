import React from "react"

import "./Burger.css"

const Burger = ({ isBurgerOpen }) => (
  <div className={`burger ${isBurgerOpen ? "is-active" : ""}`}>
    <div className="burger-inner"></div>
  </div>
)

export default Burger
