import React, { useState } from "react"

import "./MenuButton.css"

const MenuButton = ({
  onClick,
  buttonContent,
  tooltipContent,
  tooltipActive,
}) => {
  const [isTooltip, setTooltip] = useState(false)

  return (
    <div className="menu-button-tooltip">
      <div
        className={`menu-tooltip ${tooltipActive || isTooltip ? "active" : ""}`}
      >
        {tooltipContent}
      </div>
      <button
        className="menu-button"
        onClick={onClick}
        onMouseEnter={() => {
          setTooltip(true)
        }}
        onMouseLeave={() => {
          setTooltip(false)
        }}
      >
        {buttonContent}
      </button>
    </div>
  )
}

export default MenuButton
