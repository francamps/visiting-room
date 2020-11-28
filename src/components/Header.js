import React, { useState } from "react"
import { navigate } from "gatsby"
import { useMediaQuery } from "react-responsive"

import Menu from "./Menu"

import "./Header.css"

const Header = ({
  classes,
  title,
  hideTitle,
  hideMenu,
  actions,
  theme,
  setTitleHelp,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" })
  const [isHoverTitle, setHoverTitle] = useState(false)

  return (
    <div
      className={`header fadeinfast ${
        theme === "light" ? "light " : ""
      } ${classes}`}
    >
      {!hideTitle && (
        <>
          {
            null /*<div className="home-title">
            {isTabletOrMobile ? (
              <div
                onClick={() => {
                  navigate("/")
                }}
              >
                <h2>The</h2>
                <h2>Visiting Room</h2>
                <h2>Project</h2>
              </div>
            ) : (
              <h2
                onClick={() => {
                  navigate("/")
                }}
              >
                The Visiting Room Project
              </h2>
            )}
          </div>
          {title && (
            <div className="title-subtitle">
              <div className="title">
                <h2>{`> ${title}`}</h2>
              </div>
            </div>
          )}
          </div>*/
          }
          {isTabletOrMobile ? (
            <div className="home-title">
              <h6
                className="home-link"
                onClick={() => {
                  navigate("/")
                }}
              >
                The Visiting Room Project
              </h6>
              <h4 style={{ margin: 0, height: "20px", fontWeight: "300" }}>
                {title}
              </h4>
            </div>
          ) : (
            <div className="home-title">
              <span className="home-link-wrap">
                <h5
                  className="home-link"
                  style={{
                    lineHeight: "20px",
                  }}
                  onClick={() => {
                    navigate("/")
                  }}
                >
                  The Visiting Room Project
                </h5>
              </span>
              <h2
                style={{ margin: 0, height: "24px", lineHeight: "24px" }}
                onMouseOver={() => {
                  setHoverTitle(true)
                }}
                onMouseOut={() => {
                  setHoverTitle(false)
                }}
              >
                {title}
                <span
                  className={`title-help ${isHoverTitle ? "active" : ""}`}
                  onClick={() => {
                    if (setTitleHelp) setTitleHelp()
                  }}
                >
                  ?
                </span>
              </h2>
            </div>
          )}
        </>
      )}

      <div className="actions">
        {actions && actions}
        {!hideMenu && <Menu theme={theme} />}
      </div>
    </div>
  )
}

export default Header
