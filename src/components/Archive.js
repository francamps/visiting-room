import React, { useState } from "react"

import Menu from "./Menu"
import IconSearch from "./Symbols/Search"
import FilterAndSearch from "./FilterAndSearch"
import { archive } from "../content/archive"
import sortProfiles from "../utils/sortProfiles"
import { animated, useSpring } from "react-spring"

import "./Archive.css"

const columns = [
  "Full Name",
  "Offense date",
  "Age at offense",
  "Time served at interview",
]

const Archive = () => {
  const [openProfile, setOpenProfile] = useState(null)
  const [openSearch, setOpenSearch] = useState(false)

  const [searchTerm, setSearch] = useState(null)
  const [sortAsc, setSortedAsc] = useState(true)
  const [sortType, setSortedType] = useState(columns[0])
  const props = useSpring({
    config: { duration: 1200, mass: 5, tension: 350, friction: 40 },
    to: { opacity: 1, marginTop: "0" },
    from: { opacity: 0, marginTop: "60px" },
  })
  return (
    <>
      <Menu isExpanded={false} />
      <div className="archive">
        <h2>Archive</h2>
        <div className={`header-content ${openSearch ? "open" : ""} `}>
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
        {openSearch && (
          <div
            className="header-backdrop"
            onClick={() => setOpenSearch(false)}
          ></div>
        )}
        <table>
          <thead>
            <tr>
              {columns.map(column => (
                <th
                  key={`header-${column.replace(/ /g, "_")}`}
                  onClick={() => {
                    setOpenProfile(null)
                    if (sortType === column) {
                      setSortedAsc(!sortAsc)
                    } else {
                      setSortedType(column)
                    }
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortProfiles(archive.slice(0), sortType, sortAsc)
              .filter(profile => {
                if (searchTerm === null || searchTerm === "") return true
                if (profile["Full Name"].indexOf(searchTerm) > -1) return true
              })
              .map((profile, idx) => {
                return (
                  <tr
                    onClick={() => {
                      setOpenProfile(openProfile === idx ? null : idx)
                    }}
                    className={`${openProfile === idx ? "open" : ""}`}
                  >
                    <td>{profile["Full Name"]}</td>
                    <td>{profile["Offense date"]}</td>
                    <td>{profile["Age at offense"]}</td>
                    <td>{profile["Time served at interview"]}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Archive
