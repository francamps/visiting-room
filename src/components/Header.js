import React from "react"
import { navigate } from "gatsby"
import { useMediaQuery } from "react-responsive"

import Menu from "./Menu"
import Burger from "./Burger"

import "./Header.css"

const Header = ({ classes, title, hideTitle, subtitle, actions, theme }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" })

  return (
    <div
      className={`header ${theme === "light" ? "light fadein" : ""} ${classes}`}
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
            <div className="home-title" style={{}}>
              <h6
                className="home-link"
                style={{
                  margin: 0,
                  height: "20px",
                  fontWeight: "300",
                  marginBottom: "5px",
                }}
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
            <div className="home-title" style={{}}>
              <h5
                className="home-link"
                style={{
                  margin: 0,
                  height: "20px",
                  lineHeight: "20px",
                  fontWeight: "300",
                  marginBottom: "5px",
                }}
                onClick={() => {
                  navigate("/")
                }}
              >
                The Visiting Room Project
              </h5>
              <h2 style={{ margin: 0, height: "24px", lineHeight: "24px" }}>
                {title}
              </h2>
            </div>
          )}
        </>
      )}

      <div className="actions">
        {actions && actions}
        <Menu theme={theme} />
      </div>
    </div>
  )
}

export default Header
