import React, { useRef, useState } from "react"
import Img from "gatsby-image"

import Years from "./charts/years"
import Play from "./Play"

import getProfileProps from "../utils/getProfileProps"
import sortProfiles from "../utils/sortProfiles"
import useDocumentScroll from "../utils/useDocumentScroll"

import "./ArchiveTable.css"

const columns = [
  { key: "full_name", label: "Full Name" },
  { key: "picture", label: "" },
  { key: "years", label: "" },
  { key: "current_age", label: "Current Age" },
  { key: "age_at_offense", label: "Age at offense" },
  { key: "offense_date", label: "Year Incarcerated" },
]

const MINIMUM_SCROLL = 80
const TIMEOUT_DELAY = 400
const USE_PRISMIC = true

const ArchiveTable = ({
  profiles,
  images,
  sortAsc,
  sortType,
  searchTerm,
  openProfile,
  setOpenProfile,
  setShrunkHeader,
}) => {
  const ref = useRef()
  const [hoveredRow, setHover] = useState(null)

  useDocumentScroll(
    ref.current,
    callbackData => {
      const { currentScrollTop } = callbackData
      const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL

      setTimeout(() => {
        setShrunkHeader(isMinimumScrolled)
      }, TIMEOUT_DELAY)
    },
    [ref.current]
  )

  return (
    <table ref={ref}>
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={`header-${column.key}`}
              style={{ display: "flex", flexDirection: "row" }}
            >
              {column.label}
              {column.key === "years" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
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
          .map((profile, profileIdx) => {
            const {
              image,
              oldImage,

              fullName,
              date_of_offense,
              age_at_offense,
              current_age,
              deceased_date,
            } = getProfileProps(profile, images, USE_PRISMIC)

            return (
              <tr
                onMouseEnter={() => {
                  setHover(profileIdx)
                }}
                onMouseLeave={() => {
                  setHover(null)
                }}
                onClick={() => {
                  setOpenProfile(openProfile === profileIdx ? null : profileIdx)
                }}
                className={`open ${hoveredRow === profileIdx ? "hovered" : ""}`}
              >
                {" "}
                <td>{fullName}</td>
                <td style={{ display: "block" }}>
                  <div
                    style={{
                      position: "relative",
                      padding: "10px 0",
                      height: "100%",
                    }}
                  >
                    {image && image.node && (
                      <Img
                        alt={"TODO: NEEDS AN ALT"}
                        fluid={image.node.childImageSharp.fluid}
                        imgStyle={{
                          objectFit: "cover",
                          visibility: "visible",
                        }}
                      />
                    )}
                    {oldImage && oldImage.node && (
                      <Img
                        alt={"TODO: NEEDS AN ALT"}
                        fluid={oldImage.node.childImageSharp.fluid}
                        imgStyle={{
                          objectFit: "cover",
                          visibility: "visible",
                        }}
                      />
                    )}
                  </div>
                </td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Years
                    color={"black"}
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
                <td>{current_age}</td>
                <td>{age_at_offense}</td>
                <td>{date_of_offense}</td>
                <td className="play" style={{ flex: "none", width: "30px" }}>
                  <Play size="medium" color={"black"} />
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default ArchiveTable
