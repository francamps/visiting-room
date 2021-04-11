import React, { useEffect, useState, useRef } from "react"

import IconSort from "../Symbols/Sort"
import IconViewTable from "../Symbols/ViewTable"
import IconViewGrid from "../Symbols/ViewGrid"
import MenuButton from "../MenuButton"

import { handleKeyUp } from "../../utils"

import "./ArchiveActions.css"

const ArchiveActions = ({
  columns,
  setShowBanner,
  setSortedAsc,
  setSortedType,
  setView,
  sortAsc,
  sortType,
  theme,
  view,
}) => {
  const ref = useRef()

  const [isMenuOpen, setMenuOpen] = useState(false)

  const handleClickOutside = e => {
    if (ref.current.contains(e.target)) {
      // inside click
      return
    } else {
      // outside click
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  const handleSortClick = (key, keyIdx) => {
    if (sortType.key === key) {
      setSortedAsc(!sortAsc)
    } else {
      setSortedType(columns[keyIdx])
    }
  }

  return (
    <>
      <MenuButton
        theme={theme}
        onClick={() => {
          setView(view === "table" ? "grid" : "table")
        }}
        onKeyUp={ev =>
          handleKeyUp(ev, () => {
            setView(view === "table" ? "grid" : "table")
          })
        }
        buttonContent={
          view === "table" ? (
            <>
              <IconViewGrid theme="light" />
            </>
          ) : (
            <>
              <IconViewTable theme="light" />
            </>
          )
        }
        tooltipContent={
          <div style={{ width: view === "table" ? "60px" : "70px" }}>{`View ${
            view === "table" ? "grid" : "table"
          }`}</div>
        }
      />
      <div className="menu-button-tooltip">
        <MenuButton
          theme={theme}
          onClick={() => {
            setMenuOpen(!isMenuOpen)
          }}
          onKeyUp={ev =>
            handleKeyUp(ev, () => {
              setMenuOpen(!isMenuOpen)
            })
          }
          buttonContent={
            <div className="menu__wrap" ref={ref}>
              <div className={"menu__surface menu-light"}>
                <IconSort enabled theme="light" />
              </div>
              <div
                className={`menu__menu ${isMenuOpen ? "active" : ""}`}
                onClick={() => {
                  setMenuOpen(false)
                }}
                onKeyUp={ev =>
                  handleKeyUp(ev, () => {
                    setMenuOpen(false)
                  })
                }
                role="button"
              >
                <div className="menu__item">
                  <p
                    className={`${
                      sortType.key === "full_name" ? "active" : ""
                    }`}
                    onClick={() => {
                      handleSortClick("full_name", 1)
                    }}
                    onKeyUp={ev =>
                      handleKeyUp(ev, () => {
                        handleSortClick("full_name", 1)
                      })
                    }
                  >
                    <IconSort
                      enabled={sortType.key === "full_name"}
                      sortAsc={sortAsc}
                      theme="light"
                    />
                    Full name
                  </p>
                </div>
                <div className="menu__item">
                  <p
                    className={`${
                      sortType.key === "age_at_offense" ? "active" : ""
                    }`}
                    onClick={() => {
                      handleSortClick("age_at_offense", 2)
                    }}
                    onKeyUp={ev =>
                      handleKeyUp(ev, () => {
                        handleSortClick("age_at_offense", 2)
                      })
                    }
                  >
                    <IconSort
                      enabled={sortType.key === "age_at_offense"}
                      sortAsc={sortAsc}
                      theme="light"
                    />
                    Age at offense
                  </p>
                </div>
                <div className="menu__item">
                  <p
                    className={`${
                      sortType.key === "age_at_interview" ? "active" : ""
                    }`}
                    onClick={() => {
                      handleSortClick("age_at_interview", 3)
                    }}
                    onKeyUp={ev =>
                      handleKeyUp(ev, () => {
                        handleSortClick("age_at_interview", 3)
                      })
                    }
                  >
                    <IconSort
                      enabled={sortType.key === "age_at_interview"}
                      sortAsc={sortAsc}
                      theme="light"
                    />
                    Age at interview
                  </p>
                </div>
                <div className="menu__item">
                  <p
                    className={`${
                      sortType.key === "offense_date" ? "active" : ""
                    }`}
                    onClick={() => {
                      handleSortClick("offense_date", 4)
                    }}
                    onKeyUp={ev =>
                      handleKeyUp(ev, () => {
                        handleSortClick("offense_date", 4)
                      })
                    }
                  >
                    <IconSort
                      enabled={sortType.key === "offense_date"}
                      sortAsc={sortAsc}
                      theme="light"
                    />
                    Year of incarceration
                  </p>
                </div>
              </div>
            </div>
          }
          tooltipContent={"Sorting"}
        />
      </div>
    </>
  )
}

export default ArchiveActions
