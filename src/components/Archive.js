import React, { useState } from "react"
import Img from "gatsby-image"
import { useSpring } from "react-spring"

import Menu from "./Menu"
import IconSearch from "./Symbols/Search"
import Play from "./Play"
import FilterAndSearch from "./FilterAndSearch"
import Years from "./charts/Years"
//import { archive } from "../content/archive"

import sortProfiles from "../utils/sortProfiles"
import getProfileProps from "../utils/getProfileProps"

import "./Archive.css"

const columns = [
  { key: "picture", label: "" },
  { key: "full_name", label: "Full Name" },
  { key: "age_at_offense", label: "Age" },
  //{ key: "current_age", label: "Current age" },
  { key: "offense_date", label: "Year Incarcerated" },
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
        <div className="header">
          <h2>Archive</h2>
          <p>
            This collection includes interviews with 110 people who are serving
            life without the possibility of parole at the Louisiana State
            Penitentiary, Angola. The interviews were conducted by Professor
            Marcus Kondkar of Loyola University New Orleans in 2017 and 2018.
            For more information about the project, see our About page.
          </p>
        </div>

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
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  {column.label}
                  {column.key === "age_at_offense" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <span>Age at incarceration</span>
                      <span style={{ color: "var(--clr-primary)" }}>
                        Current age
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </th>
              ))}
              <th
                className="play"
                style={{
                  flex: "none",
                  width: "50px",
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
                  date_of_offense,
                  age_at_offense,
                  current_age,
                  deceased_date,
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
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <Years
                        incarcerated={age_at_offense}
                        current={current_age}
                        deceased_date={deceased_date}
                      />
                      <p
                        style={{
                          margin: 0,
                          fontSize: "var(--font-xsmall)",
                          height: "20px",
                        }}
                      >
                        Years incarcerated:
                        <span
                          style={{
                            color: "var(--clr-primary)",
                            whiteSpace: "pre",
                          }}
                        >{` ${current_age - age_at_offense}`}</span>
                      </p>
                      {deceased_date && (
                        <p
                          style={{
                            margin: 0,
                            fontSize: "var(--font-xsmall)",
                            height: "20px",
                          }}
                        >{`Deceased on ${deceased_date}`}</p>
                      )}
                    </td>
                    {null /*<td>{current_age}</td>*/}
                    <td>{date_of_offense}</td>
                    <td
                      className="play"
                      style={{ flex: "none", width: "50px" }}
                    >
                      <Play size="medium" />
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
