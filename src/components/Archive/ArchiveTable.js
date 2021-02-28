import React, { useMemo, useState } from "react"
import { useMediaQuery } from "react-responsive"

import Loading from "../Loading"
import ArchiveTableRow from "./ArchiveTableRow"
import ArchiveTableRowLarge from "./ArchiveTableRowLarge"

import sortProfiles from "../../utils/sortProfiles"

import "./ArchiveTable.css"

const columnsDesktop = [
  { key: "full_name", label: "Full Name" },
  { key: "offense_date", label: "Incarcerated since" },
  { key: "age_at_offense", label: "Age at offense" },
  { key: "current_age", label: "Age" },
  { key: "years", label: "Years incarcerated" },
]

const columnsMobile = [
  { key: "full_name", label: "" },
  { key: "information", label: "" },
  { key: "video", label: "" },
]

const ArchiveTable = ({ profiles, images, sortType, sortAsc }) => {
  const [isLoading, setLoading] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  const profilesSorted = useMemo(() => {
    setLoading(true)
    const newProfiles = sortProfiles(profiles.slice(0), sortType, sortAsc)
    setLoading(false)
    return newProfiles
  }, [JSON.stringify(profiles), sortAsc, sortType])

  if (isTabletOrMobile) {
    return (
      <table className="isCompact">
        <thead>
          <tr style={{ height: "40px" }}>
            <th
              style={{
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              All information corresponding to the time of the interview, 2017
              and 2018.
            </th>
          </tr>
        </thead>
        <tbody>
          {profilesSorted.map((profile, profileIdx) => {
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
      {isLoading && <Loading />}

      <table>
        <thead>
          <tr style={{ height: "30px" }}>
            <th style={{ padding: "0 10px", lineHeight: "30px" }}>
              All information corresponding to the time of the interview, 2017
              and 2018.
            </th>
          </tr>
          <tr>
            {columnsDesktop.map(column => (
              <th key={`header-${column.key}`}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {profilesSorted.map((profile, profileIdx) => {
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
