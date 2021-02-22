import React, { useEffect, useState, useRef } from "react"

import IconSort from "../Symbols/Sort"
import IconViewTable from "../Symbols/ViewTable"
import IconViewGrid from "../Symbols/ViewGrid"
import MenuButton from "../MenuButton"

import "./ArchiveActions.css"

const ArchiveActions = ({
  columns,
  setShowBanner,
  setSortedAsc,
  setSortedType,
  setView,
  sortAsc,
  sortType,
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
        onClick={() => {
          setView(view === "table" ? "grid" : "table")
        }}
        buttonContent={
          view === "table" ? (
            <>
              <IconViewGrid />
            </>
          ) : (
            <>
              <IconViewTable />
            </>
          )
        }
        tooltipContent={`View ${view === "table" ? "grid" : "table"}`}
      />
      <div className="menu-button-tooltip">
        <MenuButton
          buttonContent={
            <div className="menu__wrap" ref={ref}>
              <button
                className="menu-button menu__surface"
                onClick={() => {
                  setMenuOpen(!isMenuOpen)
                }}
              >
                <IconSort enabled />
              </button>
              <div
                className={`menu__menu ${isMenuOpen ? "active" : ""}`}
                onClick={() => {
                  setMenuOpen(false)
                }}
              >
                <div className="menu__item">
                  <p
                    className={`${
                      sortType.key === "full_name" ? "active" : ""
                    }`}
                    onClick={() => {
                      handleSortClick("full_name", 1)
                    }}
                  >
                    <IconSort
                      enabled={sortType.key === "full_name"}
                      sortAsc={sortAsc}
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
                  >
                    <IconSort
                      enabled={sortType.key === "age_at_offense"}
                      sortAsc={sortAsc}
                    />
                    Age at offense
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
                  >
                    <IconSort
                      enabled={sortType.key === "offense_date"}
                      sortAsc={sortAsc}
                    />
                    Year of incarceration
                  </p>
                </div>
                <div className="menu__item">
                  <p
                    className={`${
                      sortType.key === "current_age" ? "active" : ""
                    }`}
                    onClick={() => {
                      handleSortClick("current_age", 3)
                    }}
                  >
                    <IconSort
                      enabled={sortType.key === "current_age"}
                      sortAsc={sortAsc}
                    />
                    Current age
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
