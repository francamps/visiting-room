import React, { useState } from "react"
import Img from "gatsby-image"
import { useMediaQuery } from "react-responsive"
import { navigate } from "gatsby"

import Loading from "../Loading"
import Years from "../charts/Years"
import Play from "../Symbols/Play"
import ArchiveTableRow from "./ArchiveTableRow"

import { videos } from "../../content/archiveRegistry"
import getProfileProps from "../../utils/getProfileProps"

import "./ArchiveTable.css"

const columnsDesktop = [
  { key: "full_name", label: "Full Name" },
  { key: "picture", label: "" },
  { key: "years", label: "Years incarcerated" },
  { key: "current_age", label: "Current Age" },
  { key: "age_at_offense", label: "Age at offense" },
  { key: "offense_date", label: "Year of incarceration" },
]

const columnsMobile = [
  { key: "full_name", label: "Name" },
  { key: "information", label: "" },
  { key: "video", label: "" },
]

const USE_PRISMIC = true

const ArchiveTable = ({ profiles, images, isSearchLoading }) => {
  const [hoveredRow, setHover] = useState(null)
  const isTabletOrMobile = true //useMediaQuery({ query: "(max-width: 1224px)" })

  if (isTabletOrMobile) {
    return (
      <table className="isCompact">
        <thead>
          <tr>
            {columnsMobile.map(column => (
              <th key={`header-${column.key}`}>{column.label}</th>
            ))}
            <th className="play" />
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, profileIdx) => {
            return <ArchiveTableRow profile={profile} profileIdx={profileIdx} />
          })}
        </tbody>
      </table>
    )
  }

  return (
    <>
      {isSearchLoading && <Loading />}

      <table>
        <thead>
          <tr>
            {columnsDesktop.map(column => (
              <th key={`header-${column.key}`}>{column.label}</th>
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
            } = getProfileProps(profile, USE_PRISMIC)

            return (
              <tr
                key={`archive-table-row-${profileIdx}`}
                onMouseEnter={() => {
                  setHover(profileIdx)
                }}
                onMouseLeave={() => {
                  setHover(null)
                }}
                className={`${hoveredRow === profileIdx ? "hovered" : ""}`}
                onClick={() => {
                  const profileUri = fullName.toLowerCase().replace(/ /g, "_")
                  videos[fullName] && navigate(`/archive/${profileUri}`)
                }}
              >
                <td>{fullName}</td>
                <td style={{ display: "block" }}>
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    {image && (
                      <Img
                        alt={"TODO: NEEDS AN ALT"}
                        fluid={image}
                        imgStyle={{
                          objectFit: "cover",
                          visibility: "visible",
                        }}
                      />
                    )}
                    {oldImage && (
                      <Img
                        alt={"TODO: NEEDS AN ALT"}
                        fluid={oldImage}
                        imgStyle={{
                          objectFit: "cover",
                          visibility: "visible",
                        }}
                      />
                    )}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent:
                        hoveredRow === profileIdx
                          ? "space-between"
                          : "flex-end",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    {hoveredRow === profileIdx && (
                      <Years
                        color={"white"}
                        incarcerated={age_at_offense}
                        current={current_age}
                        deceased_date={deceased_date}
                      />
                    )}
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                        }}
                      >
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
                            height: "20px",
                          }}
                        >{`Deceased on ${deceased_date}`}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td>{current_age}</td>
                <td>{age_at_offense}</td>
                <td>{date_of_offense}</td>
                {videos[fullName] ? (
                  <td className="play">
                    <Play useCircle={false} color={"white"} />
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
    </>
  )
}

export default ArchiveTable
