import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"

import "./MenuButton.css"

const MenuButton = ({
  theme,
  onClick,
  onKeyUp,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  buttonContent,
  styling,
  tooltipContent,
  tooltipActive,
  tooltipStyling,
}) => {
  const [isTooltip, setTooltip] = useState(false)
  const [isHolding, setHolding] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  return (
    <div
      className={`menu-button-tooltip ${isHolding ? "holding" : ""}`}
      style={styling || { flexDirection: "row" }}
    >
      <div
        className={`menu-tooltip ${
          tooltipActive || (isTooltip && !isTabletOrMobile) ? "active" : ""
        }`}
        style={tooltipStyling}
      >
        {tooltipContent}
      </div>
      <button
        className={`menu-button ${theme === "light" ? "menu-light" : ""}`}
        onClick={onClick}
        onKeyUp={onKeyUp}
        onMouseDown={e => {
          if (onMouseDown) {
            setHolding(true)
            setTooltip(false)
            onMouseDown(e)
          }
        }}
        onMouseUp={e => {
          if (onMouseUp) {
            setHolding(false)
            onMouseUp(e)
          }
        }}
        onTouchStart={e => {
          if (onTouchStart) {
            setHolding(true)
            setTooltip(false)
            onTouchStart(e)
          }
        }}
        onTouchEnd={e => {
          if (onTouchEnd) {
            setHolding(false)
            onTouchEnd(e)
          }
        }}
        onMouseEnter={() => {
          setTooltip(true)
        }}
        onMouseLeave={e => {
          setTooltip(false)
          if (onMouseUp) onMouseUp(e)
        }}
      >
        {buttonContent}
      </button>
    </div>
  )
}

export default MenuButton
