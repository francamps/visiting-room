import React, { useEffect, useState, useRef } from "react"
import Menu, { SubMenu, MenuItem } from "rc-menu"
import "rc-menu/assets/index.css"

import IconSearch from "../Symbols/Search"
import FilterAndSearch from "../FilterAndSearch"

import "./ArchiveActions.css"

const ArchiveActions = ({
  columns,
  openSearch,
  setOpenSearch,
  setShowBanner,
  setSortedAsc,
  setSortedType,
  setSearch,
  setView,
  sortAsc,
  sortType,
  view,
}) => {
  const ref = useRef()

  const [isSortOpen, setSortOpen] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)

  const handleClickOutside = e => {
    if (ref.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    setMenuOpen(false)
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

  return (
    <div ref={ref}>
      <div
        className="menu__surface"
        onClick={() => {
          setMenuOpen(!isMenuOpen)
        }}
      >
        Options
      </div>
      {isMenuOpen && (
        <Menu
          triggerSubMenuAction="click"
          onClick={() => {
            setMenuOpen(false)
          }}
        >
          <MenuItem>
            <p
              onClick={() => {
                setView(view === "table" ? "grid" : "table")
              }}
            >
              {view === "table" ? "View grid" : "View table"}
            </p>
          </MenuItem>
          <SubMenu title="Sort">
            <MenuItem>
              <p
                className={`${sortType.key === "full_name" ? "active" : ""}`}
                onClick={() => {
                  if (sortType.key === "full_name") {
                    setSortedAsc(!sortAsc)
                  } else {
                    setSortedType(columns[1])
                  }
                }}
              >
                Full name
              </p>
            </MenuItem>
            <MenuItem>
              <p
                className={`${
                  sortType.key === "age_at_offense" ? "active" : ""
                }`}
                onClick={() => {
                  if (sortType.key === "age_at_offense") {
                    setSortedAsc(!sortAsc)
                  } else {
                    setSortedType(columns[2])
                  }
                }}
              >
                Age at offense
              </p>
            </MenuItem>
            <MenuItem>
              <p
                className={`${sortType.key === "offense_date" ? "active" : ""}`}
                onClick={() => {
                  if (sortType.key === "offense_date") {
                    setSortedAsc(!sortAsc)
                  } else {
                    setSortedType(columns[3])
                  }
                }}
              >
                Year of incarceration
              </p>
            </MenuItem>
          </SubMenu>
          <MenuItem>
            <p
              onClick={() => {
                window.localStorage.setItem("showBanner", "true")
                setShowBanner(true)
              }}
            >
              About the archive
            </p>
          </MenuItem>
        </Menu>
      )}
    </div>
  )

  return (
    <div
      onMouseLeave={() => {
        setMenuOpen(false)
      }}
      style={{
        position: "relative",
      }}
    >
      <div
        className="menu__surface"
        onClick={() => {
          setMenuOpen(!isMenuOpen)
        }}
      >
        Options
      </div>
      <div className={`menu__content ${isMenuOpen ? "open" : ""}`}>
        <div className="view-options"></div>
        <div
          className={`sorting-options ${isSortOpen ? "open" : ""}`}
          onMouseOver={() => {
            setSortOpen(true)
          }}
          onMouseLeave={() => {
            setSortOpen(false)
          }}
          onClick={() => {
            setSortOpen(!isSortOpen)
          }}
        >
          <div className="surface">
            <p>Sort</p>
            <div className="options-menu"></div>
          </div>
        </div>
        {!openSearch && (
          <div
            className="search-trigger"
            onClick={() => {
              // TODO: DO SOMETHING
            }}
          >
            <IconSearch />
          </div>
        )}
        {openSearch && <FilterAndSearch onSearchTyping={setSearch} />}
        <p
          onClick={() => {
            window.localStorage.setItem("showBanner", "true")
            setShowBanner(true)
          }}
        >
          About the archive
        </p>
      </div>
    </div>
  )
}

export default ArchiveActions
