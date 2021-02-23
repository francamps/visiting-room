import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"

import Loading from "../Loading"
import ArchiveTableRow from "./ArchiveTableRow"
import ArchiveTableRowLarge from "./ArchiveTableRowLarge"

import "./ArchiveTable.css"

const columnsDesktop = [
  { key: "full_name", label: "Full Name" },
  { key: "offense_date", label: "Incarcerated since" },
  { key: "age_at_offense", label: "Age at offense" },
  { key: "current_age", label: "Current Age" },
  { key: "years", label: "Years incarcerated" },
]

const columnsMobile = [
  { key: "full_name", label: "" },
  { key: "information", label: "" },
  { key: "video", label: "" },
]

const ArchiveTable = ({ profiles, images, isSearchLoading }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  if (isTabletOrMobile) {
    return (
      <table className="isCompact">
        <thead>
          <tr>
            {columnsMobile.map(column => (
              <th key={`header-${column.key}`}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, profileIdx) => {
            return (
              <ArchiveTableRow
                key={`archive-table-row-${profileIdx}`}
                profile={profile}
                profileIdx={profileIdx}
              />
            )
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
            return (
              <ArchiveTableRowLarge
                key={`archive-table-row-${profileIdx}`}
                profile={profile}
                profileIdx={profileIdx}
              />
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default ArchiveTable
