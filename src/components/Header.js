import React from "react"
import { navigate } from "gatsby"
import { useMediaQuery } from "react-responsive"

import Menu from "./Menu"

import "./Header.css"

const Header = ({ classes, title, hideTitle, subtitle, actions, theme }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  return (
    <div className={`header ${theme} ${classes}`}>
      {!hideTitle && (
        <div className="home-title-wrap">
          <div className="home-title">
            {isTabletOrMobile ? (
              <>
                <h2>The</h2>
                <h2>Visiting Room</h2>
                <h2>Project</h2>
              </>
            ) : (
              <h2 onClick={() => navigate("/")}>The Visiting Room Project</h2>
            )}
          </div>
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
