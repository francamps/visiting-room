import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { useMediaQuery } from "react-responsive"

import Menu from "./Menu"

import HeaderBanner from "./HeaderBanner"
import useDocumentScrollThrottled from "../utils/useDocumentScroll"

import { handleKeyUp } from "../utils"

import "./Header.css"

const MINIMUM_SCROLL = 80
const TIMEOUT_DELAY = 200

const Header = ({
  banner,
  classes,
  color,
  title,
  hideMenu,
  actions,
  theme,
  onSetShowBanner,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" })
  const [isHoverTitle, setHoverTitle] = useState(false)
  const [isHoverHome, setHoverHome] = useState(false)
  const [showBanner, setShowBanner] = useState(
    (typeof window !== "undefined" &&
      window.localStorage.getItem(`showBanner__${banner}`) === "false") ||
      !banner
      ? false
      : true
  )

  useDocumentScrollThrottled(callbackData => {
    const { previousScrollTop, currentScrollTop } = callbackData
    const isScrolledDown = previousScrollTop < currentScrollTop
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL

    setTimeout(() => {
      if (isScrolledDown && isMinimumScrolled) {
        setShowBanner(false)
      }
    }, TIMEOUT_DELAY)
  })

  useEffect(() => {
    if (showBanner) {
      window.localStorage.setItem(`showBanner__${banner}`, "true")
      if (onSetShowBanner) onSetShowBanner(true)
    } else {
      window.localStorage.setItem(`showBanner__${banner}`, "false")
      if (onSetShowBanner) onSetShowBanner(false)
    }
  }, [showBanner])

  return (
    <div
      className={`header fadeinfast ${
        theme === "light" ? "light " : ""
      } ${classes}`}
      style={{
        background: theme === "light" ? "" : "",
      }}
    >
      <>
        <div
          className={`home-home ${isHoverHome ? "hovered" : ""} ${
            color ? "static" : ""
          }`}
          style={
            color && {
              background: color,
            }
          }
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
          onKeyUp={ev =>
            handleKeyUp(ev, () => {
              navigate("/")
            })
          }
          role="link"
          tabIndex={0}
        >
          <div className="home-home-content">
            <span>The</span>
            <span>Visiting Room</span>
            <span>Project</span>
          </div>
        </div>
        {isTabletOrMobile ? (
          <div
            className={`home-title ${
              isHoverTitle && !showBanner ? "active" : ""
            } ${color ? "static" : ""}`}
            onClick={() => {
              if (!showBanner) setShowBanner(true)
            }}
            onKeyUp={ev =>
              handleKeyUp(ev, () => {
                if (!showBanner) setShowBanner(true)
              })
            }
            role="button"
            tabIndex={0}
          >
            <h4 className={showBanner ? "banner-active" : ""}>{title}</h4>
            {banner && (
              <HeaderBanner
                banner={banner}
                isShow={showBanner}
                setShowBanner={setShowBanner}
              />
            )}
          </div>
        ) : (
          <div
            className={`home-title ${
              isHoverTitle && !showBanner ? "active" : ""
            }`}
            onClick={() => {
              if (!showBanner) setShowBanner(true)
            }}
            onKeyUp={ev =>
              handleKeyUp(ev, () => {
                if (!showBanner) setShowBanner(true)
              })
            }
            role="button"
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
              className={showBanner ? "banner-active" : ""}
            >
              {title}
              <span className="title-help">?</span>
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
      <div className={`actions menu-buttons ${theme || ""}`}>
        {!hideMenu && <Menu theme={theme} />}
        {actions && actions}
      </div>
    </div>
  )
}

export default Header
