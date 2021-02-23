import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"

import "./MenuButton.css"

const MenuButton = ({
  onClick,
  buttonContent,
  tooltipContent,
  tooltipActive,
  tooltipStyling,
}) => {
  const [isTooltip, setTooltip] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  return (
    <div className="menu-button-tooltip">
      <div
        className={`menu-tooltip ${
          tooltipActive || (isTooltip && !isTabletOrMobile) ? "active" : ""
        }`}
        style={tooltipStyling}
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