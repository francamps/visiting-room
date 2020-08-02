import React from "react"
import { useSpring } from "react-spring"

import IconSearch from "./Symbols/Search"
import FilterAndSearch from "./FilterAndSearch"

import "./ArchiveHeader.css"

const ArchiveHeader = ({
  columns,
  isShrunkHeader,
  openSearch,
  setOpenSearch,
  setOpenProfile,
  setSortedAsc,
  setSortedType,
  setSearch,
  setShowArchive,
  setView,
  shrunk,
  sortAsc,
  sortType,
}) => {
  const props = useSpring({
    config: { duration: 1200, mass: 5, tension: 350, friction: 40 },
    to: { opacity: 1, marginTop: "0" },
    from: { opacity: 0, marginTop: "60px" },
  })

  return (
    <div className={`header ${isShrunkHeader ? "shrunk" : ""}`}>
      <div className="header-intro">
        <h2>Archive</h2>
        <p>
          This collection includes full-length interviews with 110 people who
          are serving life without the possibility of parole at the Louisiana
          State Penitentiary, Angola.
        </p>

        <p>
          The interviews were conducted by Professor Marcus Kondkar of Loyola
          University New Orleans in 2017 and 2018.
        </p>

        <p>The best place to start is by visiting the Visiting Room.</p>
        <p>For more information about the project, see our About page.</p>
      </div>
      <div className={`header-controls ${openSearch ? "open" : ""} `}>
        <div className="info-options">
          <p
            onClick={() => {
              window.localStorage.getItem("showArchive", "false")
              setShowArchive(false)
            }}
          >
            About the archive
          </p>
        </div>
        <div className="view-options">
          <p
            onClick={() => {
              setView("table")
            }}
          >
            View table
          </p>
          <p
            onClick={() => {
              setView("grid")
            }}
          >
            View grid
          </p>
        </div>
        <div className="sorting-options">
          <p>Sort by:</p>
          <p
            className={`${sortType.key === "full_name" ? "active" : ""}`}
            onClick={() => {
              setOpenProfile(null)
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
              setOpenProfile(null)
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
              setOpenProfile(null)
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
        {!openSearch && (
          <div
            className="search-trigger"
            onClick={() => {
              setOpenSearch(true)
            }}
          >
            <IconSearch />
          </div>
        )}
        {openSearch && (
          <div style={props}>
            <FilterAndSearch onSearchTyping={setSearch} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ArchiveHeader
