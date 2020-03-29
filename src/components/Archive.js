import React, { useState } from "react"

import Menu from "./Menu"
import FilterAndSearch from "./FilterAndSearch"
import { archive } from "../content/archive"

import "./Archive.css"

const sortArchive = (data, sortType, sortAsc) => {
  data.sort((a, b) => {
    if (a[sortType] > b[sortType]) return sortAsc ? 1 : -1
    if (a[sortType] < b[sortType]) return sortAsc ? -1 : 1
  })
  return data
}

const columns = [
  "Full Name",
  "Offense date",
  "Age at offense",
  "Time served at interview",
]

const Archive = () => {
  const [openProfile, setOpenProfile] = useState(null)

  const [search, setSearch] = useState(null)
  const [sortAsc, setSortedAsc] = useState(true)
  const [sortType, setSortedType] = useState(columns[0])

  return (
    <>
      <Menu isExpanded={false} />
      <div className="archive">
        <h2>Archive</h2>
        <div className="header-content">
          <FilterAndSearch onSearchTyping={setSearch} />
        </div>
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
            {sortArchive(archive.slice(0), sortType, sortAsc)
              .filter(profile => {
                if (search === null) return true
                if (profile["Full Name"].indexOf(search) > -1) return true
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
