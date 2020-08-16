import React, { useState } from "react"

import IconSearch from "../Symbols/Search"
import FilterAndSearch from "../FilterAndSearch"

import "./ArchiveActions.css"

const ArchiveActions = ({
  columns,
  openSearch,
  setOpenSearch,
  setSortedAsc,
  setSortedType,
  setSearch,
  setShowArchive,
  setView,
  sortAsc,
  sortType,
  view,
}) => {
  const [isSortOpen, setSortOpen] = useState(false)

  return (
    <>
      <div className="view-options">
        <p
          onClick={() => {
            setView(view === "table" ? "grid" : "table")
          }}
        >
          {view === "table" ? "View grid" : "View table"}
        </p>
      </div>
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
          <div className="options-menu">
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
            <p
              className={`${sortType.key === "age_at_offense" ? "active" : ""}`}
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
          </div>
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
    </>
  )
}

export default ArchiveActions
