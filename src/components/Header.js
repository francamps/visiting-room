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
      style={{
        background:
          theme === "light"
            ? "linear-gradient(rgba(var(--clr-white-rgb),1), rgba(var(--clr-white-rgb), 0.75) 50%, rgba(var(--clr-white-rgb), 0.5) 75%, rgba(var(--clr-white-rgb), 0) 100%)"
            : //? "linear-gradient(rgba(var(--clr-white-rgb),1) 100%, rgba(var(--clr-white-rgb), 0.75) 50%, rgba(var(--clr-white-rgb), 0.5) 25%, rgba(var(--clr-white-rgb),0) 0%)"
              "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0))",
      }}
    >
      {!hideTitle && (
        <>
          <div
            className="home-home"
            onClick={() => {
              navigate("/")
            }}
          >
            <span>The</span>
            <span>Visiting Room</span>
            <span>Project</span>
          </div>
          {isTabletOrMobile ? (
            <div
              className="home-title"
              style={{
                width:
                  title === "Full Archive"
                    ? "calc(100% - 230px)"
                    : "calc(100% - 140px)",
              }}
            >
              <h4>{title}</h4>
            </div>
          ) : (
            <div className="home-title">
              <h2
                style={{
                  margin: 0,
                  height: "24px",
                  lineHeight: "24px",
                }}
                onFocus={() => {
                  setHoverTitle(true)
                }}
                onBlur={() => {
                  setHoverTitle(false)
                }}
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
