import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { useMediaQuery } from "react-responsive"

import Menu from "./Menu"

import HeaderBanner from "./HeaderBanner"
import useDocumentScrollThrottled from "../utils/useDocumentScroll"

import "./Header.css"

const Header = ({
  banner,
  classes,
  title,
  hideTitle,
  hideMenu,
  actions,
  theme,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" })
  const [isHoverTitle, setHoverTitle] = useState(false)
  const [isHoverHome, setHoverHome] = useState(false)
  const [showBanner, setShowBanner] = useState(
    true
    // TODO: Save in localStore once viewed, and pull from there
    //typeof window !== "undefined" &&
    //  window.localStorage.getItem("showVRBanner") === "false"
    //  ? false
    //  : true
  )
  const [isShrinkHeader, setShrinkHeader] = useState(false)

  const MINIMUM_SCROLL = 80
  const TIMEOUT_DELAY = 200

  useDocumentScrollThrottled(callbackData => {
    const { previousScrollTop, currentScrollTop } = callbackData
    const isScrolledDown = previousScrollTop < currentScrollTop
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL

    setTimeout(() => {
      if (isScrolledDown && isMinimumScrolled) setShrinkHeader(true)
    }, TIMEOUT_DELAY)
  })

  useEffect(() => {
    setShowBanner(!isShrinkHeader)
  }, [isShrinkHeader])

  //const headerStyle = isTallHeader ? 'tall' : 'short';

  console.log(showBanner)

  return (
    <div
      className={`header fadeinfast ${
        theme === "light" ? "light " : ""
      } ${classes}`}
      style={{
        background:
          theme === "light"
            ? "linear-gradient(rgba(var(--clr-white-rgb),1), rgba(var(--clr-white-rgb), 0.75) 50%, rgba(var(--clr-white-rgb), 0.5) 75%, rgba(var(--clr-white-rgb), 0) 100%)"
            : "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0))",
      }}
    >
      {!hideTitle && (
        <>
          <div
            className={`home-home ${isHoverHome ? "hovered" : ""}`}
            onClick={() => {
              navigate("/")
            }}
            onFocus={() => {
              setHoverHome(true)
            }}
            onBlur={() => {
              setHoverHome(false)
            }}
            onMouseOver={() => {
              setHoverHome(true)
            }}
            onMouseOut={() => {
              setHoverHome(false)
            }}
          >
            <div className="home-home-content">
              <span>The</span>
              <span>Visiting Room</span>
              <span>Project</span>
            </div>
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
            <div
              className={`home-title ${
                isHoverTitle || (!isShrinkHeader && showBanner) ? "active" : ""
              }`}
            >
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
                  className="title-help"
                  onClick={() => {
                    window.localStorage.setItem("showVRBanner", "true")
                    setShowBanner(true)
                  }}
                  style={{ marginTop: "-4px" }}
                >
                  ?
                </span>
              </h2>
              {banner && (
                <HeaderBanner
                  banner={banner}
                  isShow={showBanner}
                  setShowBanner={setShowBanner}
                />
              )}
            </div>
          )}
        </>
      )}

      <div className="actions menu-buttons">
        {!hideMenu && <Menu theme={theme} />}
        {actions && actions}
      </div>
    </div>
  )
}

export default Header
