import React from "react"
import { navigate } from "gatsby"

import Menu from "./Menu"

import "./Header.css"

const Header = ({ title, hideTitle, subtitle, actions, theme }) => {
  return (
    <div className={`header ${theme}`}>
      {!hideTitle && (
        <div className="home-title">
          <h2 onClick={() => navigate("/")}>The Visiting Room</h2>
        </div>
      )}

      {title && (
        <div className="title-subtitle">
          <div className="title">
            <h2>{title}</h2>
          </div>
          <div className="subtitle">{subtitle}</div>
        </div>
      )}
      <div className="actions">
        {actions && actions}
        <Menu theme={theme} />
      </div>
    </div>
  )
}

export default Header
