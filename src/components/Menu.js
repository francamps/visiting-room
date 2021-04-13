import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { useMediaQuery } from "react-responsive"

import Burger from "./Burger"

import { handleKeyUp } from "../utils"

import "./Menu.css"

import { colors } from "../content/colors"

const Menu = ({ theme, fadein, isMenuExpanded = false, setMenuExpanded }) => {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  const [isTooltip, setTooltip] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  useEffect(() => {
    setBurgerOpen(isMenuExpanded)
  }, [isMenuExpanded])

  const getColor = idx => {
    //return colors[Math.floor(Math.random() * colors.length)]
    return colors[idx]
  }

  return (
    <>
      <div className="menu-button-tooltip">
        <div
          className={`menu-tooltip ${
            isTooltip && !isTabletOrMobile ? "active" : ""
          }`}
        >
          Menu
        </div>
        <button
          className={`menu menu-button 
          ${theme === "light" ? " menu-light" : ""}
          ${fadein ? " fadein" : ""}
          ${isTooltip ? " hovered" : ""}
        `}
          style={{
            padding: "10px 14px",
          }}
          onClick={() => {
            setBurgerOpen(!isBurgerOpen)
          }}
          onKeyUp={ev =>
            handleKeyUp(ev, () => {
              setBurgerOpen(!isBurgerOpen)
            })
          }
          onMouseEnter={() => {
            setTooltip(true)
          }}
          onMouseLeave={() => {
            setTooltip(false)
          }}
        >
          <Burger isBurgerOpen={isBurgerOpen} />
        </button>
      </div>
      <div
        className={`menu-backdrop ${isBurgerOpen ? "menu-backdrop-on" : ""}`}
        onClick={() => {
          setBurgerOpen(false)
        }}
        onKeyUp={ev =>
          handleKeyUp(ev, () => {
            setBurgerOpen(false)
          })
        }
        role="button"
        aria-label="Close menu"
        tabIndex="0"
      />
      <div
        className={`menu-options ${isBurgerOpen ? "open" : ""} ${
          theme === "light" ? "menu-light" : ""
        } ${isBurgerOpen ? "fadein" : ""}`}
        onClick={() => {
          setBurgerOpen(false)
        }}
        onKeyUp={ev =>
          handleKeyUp(ev, () => {
            setBurgerOpen(false)
          })
        }
        role="button"
        tabIndex="0"
      >
        <div className="menu-option-wrap">
          <a
            onClick={() => {
              setBurgerOpen(false)
              if (typeof window !== "undefined") {
                navigate("/visiting-room")
              }
            }}
            onKeyUp={ev =>
              handleKeyUp(ev, () => {
                setBurgerOpen(false)
                if (typeof window !== "undefined") {
                  navigate("/visiting-room")
                }
              })
            }
            className="hover-link"
            role="link"
            tabIndex={0}
          >
            The Visiting Room
          </a>
        </div>
        <div className="menu-option-wrap">
          <Link
            to="/history"
            className="hover-link"
            onClick={() => {
              setBurgerOpen(false)
            }}
            onKeyUp={ev =>
              handleKeyUp(ev, () => {
                setBurgerOpen(false)
              })
            }
          >
            A History of Life Without Parole
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link
            to="/archive"
            className="hover-link"
            onClick={() => {
              setBurgerOpen(false)
            }}
            onKeyUp={ev =>
              handleKeyUp(ev, () => {
                setBurgerOpen(false)
              })
            }
          >
            Archive
          </Link>
        </div>
        <div className="menu-option-wrap">
          <Link
            to="/about"
            className="hover-link"
            onClick={() => {
              setBurgerOpen(false)
            }}
            onKeyUp={ev =>
              handleKeyUp(ev, () => {
                setBurgerOpen(false)
              })
            }
          >
            About
          </Link>
        </div>
      </div>
    </>
  )
}

export default Menu
