import React, { useState } from "react"
import Img from "gatsby-image"
import { useSpring } from "react-spring"

import Menu from "./Menu"
import IconSearch from "./Symbols/Search"
import Play from "./Play"
import FilterAndSearch from "./FilterAndSearch"
import { archive } from "../content/archive"

import sortProfiles from "../utils/sortProfiles"
import getProfileProps from "../utils/getProfileProps"

import "./Archive.css"

const columns = [
  { key: "picture", label: "Picture" },
  { key: "full_name", label: "Full Name" },
  { key: "current_age", label: "Current age" },
  { key: "age_at_offense", label: "Age at offense" },
  { key: "offense_date", label: "Offense date" },
]

const USE_PRISMIC = true

const Archive = ({ profiles, images }) => {
  const [openProfile, setOpenProfile] = useState(null)
  const [openSearch, setOpenSearch] = useState(false)

  const [searchTerm, setSearch] = useState(null)
  const [sortAsc, setSortedAsc] = useState(true)
  const [sortType, setSortedType] = useState(columns[1])
  const props = useSpring({
    config: { duration: 1200, mass: 5, tension: 350, friction: 40 },
    to: { opacity: 1, marginTop: "0" },
    from: { opacity: 0, marginTop: "60px" },
  })

  return (
    <div className="archive-wrap">
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
                  key={`header-${column.key}`}
                  onClick={() => {
                    setOpenProfile(null)
                    if (sortType.key === column.key) {
                      setSortedAsc(!sortAsc)
                    } else {
                      setSortedType(column)
                    }
                  }}
                >
                  {column.label}
                </th>
              ))}
              <th
                className="play"
                style={{
                  flex: "none",
                  width: "100px",
                  padding: "0 30px 0 20px",
                }}
              />
            </tr>
          </thead>
          <tbody>
            {sortProfiles(profiles.slice(0), sortType, sortAsc)
              .filter(profile => {
                if (searchTerm === null || searchTerm === "") return true
                if (profile["Full Name"].indexOf(searchTerm) > -1) return true
                return false
              })
              .map((profile, idx) => {
                const {
                  image,
                  fullName,
                  date_of_birth,
                  date_of_offense,
                  age_at_offense,
                  current_age,
                } = getProfileProps(profile, images, USE_PRISMIC)

                return (
                  <tr
                    onClick={() => {
                      setOpenProfile(openProfile === idx ? null : idx)
                    }}
                    className="open"
                  >
                    <td style={{ display: "block" }}>
                      {image && image.node && (
                        <Img
                          alt={"TODO: NEEDS AN ALT"}
                          fluid={image.node.childImageSharp.fluid}
                          imgStyle={{
                            objectFit: "cover",
                            visibility: "visible",
                            //openProfile === idx ? "visible" : "hidden",
                          }}
                        />
                      )}
                    </td>
                    <td>{fullName}</td>
                    <td>{current_age}</td>
                    <td>{age_at_offense}</td>
                    <td>{date_of_offense}</td>
                    <td
                      className="play"
                      style={{ flex: "none", width: "100px" }}
                    >
                      <Play size="large" />
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Archive
