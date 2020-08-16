import React, { useState } from "react"
import Img from "gatsby-image"

import Years from "../charts/years"
import Play from "../Play"

import getProfileProps from "../../utils/getProfileProps"

import { videos } from "../../content/archiveRegistry"

import "./ArchiveTable.css"

const columns = [
  { key: "full_name", label: "Full Name" },
  { key: "picture", label: "" },
  { key: "years", label: "" },
  { key: "current_age", label: "Current Age" },
  { key: "age_at_offense", label: "Age at offense" },
  { key: "offense_date", label: "Year Incarcerated" },
]

const USE_PRISMIC = true

const ArchiveTable = ({ profiles, images, setProfile }) => {
  const [hoveredRow, setHover] = useState(null)

  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={`header-${column.key}`}>
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
          <th className="play" />
        </tr>
      </thead>
      <tbody>
        {profiles.map((profile, profileIdx) => {
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
              key={`archive-table-row-${profileIdx}`}
              onMouseEnter={() => {
                setHover(profileIdx)
              }}
              onMouseLeave={() => {
                setHover(null)
              }}
              className={`open ${hoveredRow === profileIdx ? "hovered" : ""}`}
            >
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
              <td>
                {hoveredRow === profileIdx && (
                  <Years
                    color={"white"}
                    incarcerated={age_at_offense}
                    current={current_age}
                    deceased_date={deceased_date}
                  />
                )}

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
              {videos[fullName] ? (
                <td className="play">
                  <Play
                    size="medium"
                    color={"black"}
                    onClick={() => {
                      const profileUri = fullName
                        .toLowerCase()
                        .replace(/ /g, "_")
                      setProfile(profileUri)
                    }}
                  />
                </td>
              ) : (
                <td className="play">
                  <p>Profile not available yet.</p>
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ArchiveTable
