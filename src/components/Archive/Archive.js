import React, { useEffect, useState, useMemo } from "react"
import isNull from "lodash/isNull"

import Header from "../Header"
import ArchiveGrid from "./ArchiveGrid"
import ArchiveActions from "./ArchiveActions"
import ArchiveTable from "./ArchiveTable"
import ArchiveBanner from "./ArchiveBanner"
import Loading from "../Loading"

import sortProfiles from "../../utils/sortProfiles"

import "./Archive.css"

const columns = [
  { key: "picture", label: "" },
  { key: "full_name", label: "Full Name" },
  { key: "age_at_offense", label: "Age" },
  { key: "offense_date", label: "Year Incarcerated" },
]

const Archive = ({ profiles = [], loading, images }) => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )
  const [profileId, setProfile] = useState(params.get("profile"))

  const [showBanner, setShowBanner] = useState(
    // TODO: Save in localStore once viewed, and pull from there
    typeof window !== "undefined" &&
      window.localStorage.getItem("showBanner") === "false"
      ? false
      : true
  )
  const [fadeout, setFadeOut] = useState(false)
  const [searchTerm, setSearch] = useState(null)
  const [sortAsc, setSortedAsc] = useState(true)
  const [sortType, setSortedType] = useState(columns[1])
  const [view, setView] = useState("grid")

  const profilesSorted = useMemo(() => {
    return sortProfiles(profiles.slice(0), sortType, sortAsc).filter(
      profile => {
        if (searchTerm === null || searchTerm === "") return true
        if (profile["Full Name"].indexOf(searchTerm) > -1) return true
        return false
      }
    )
  }, [JSON.stringify(profiles), sortAsc, sortType, searchTerm])

  useEffect(() => {
    if (fadeout) {
      let timer2 = setTimeout(() => {
        setShowBanner(false)
        setFadeOut(false)
      }, 1200)

      return () => {
        clearTimeout(timer2)
      }
    }
  }, [fadeout])

  const profile =
    profiles &&
    profiles.find(
      p => p.full_name.text.toLowerCase().replace(/ /g, "_") === profileId
    )

  return (
    <div className="archive-wrap">
      {!showBanner && (
        <Header
          title={"Archive"}
          actions={
            <ArchiveActions
              columns={columns}
              setSortedAsc={setSortedAsc}
              setSortedType={setSortedType}
              setSearch={setSearch}
              sortAsc={sortAsc}
              sortType={sortType}
              setView={setView}
              setShowBanner={setShowBanner}
              view={view}
            />
          }
          classes="fadein"
        />
      )}
      <div className="archive">
        {showBanner && (
          <ArchiveBanner
            fadeout={fadeout}
            onClose={() => {
              setFadeOut(true)
            }}
            setShowBanner={setShowBanner}
          />
        )}

        {loading && <Loading />}
        {!view ||
          (view === "grid" && !loading && (
            <ArchiveGrid profiles={profilesSorted} images={images} />
          ))}
        {view === "table" && !loading && (
          <ArchiveTable profiles={profilesSorted} images={images} />
        )}
      </div>
    </div>
  )
}

export default Archive
