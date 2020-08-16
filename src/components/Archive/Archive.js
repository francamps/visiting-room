import React, { useEffect, useState, useMemo } from "react"

import Header from "../Header"
import ArchiveGrid from "./ArchiveGrid"
import ArchiveActions from "./ArchiveActions"
import ArchiveTable from "./ArchiveTable"
import ArchiveBanner from "./ArchiveBanner"
import Loading from "../Loading"
import Video from "../Video/Video"

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

  const [showArchive, setShowArchive] = useState(
    // TODO: Save in localStore once viewed, and pull from there
    typeof window !== "undefined" &&
      window.localStorage.getItem("showArchive") === "false"
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
        setShowArchive(true)
        setFadeOut(false)
      }, 1200)

      return () => {
        clearTimeout(timer2)
      }
    }
  }, [fadeout])

  useEffect(() => {
    window.localStorage.getItem("showArchive", "true")
  }, [])

  const profile =
    profiles &&
    profiles.find(
      p => p.full_name[0].text.toLowerCase().replace(/ /g, "_") === profileId
    )

  return (
    <div className="archive-wrap">
      {!profileId ? (
        <>
          <Header
            title={"Full archive"}
            subtitle={
              <p
                onClick={() => {
                  window.localStorage.getItem("showArchive", "false")
                  setShowArchive(false)
                }}
              >
                About the archive
              </p>
            }
            actions={
              <ArchiveActions
                columns={columns}
                setSortedAsc={setSortedAsc}
                setSortedType={setSortedType}
                setSearch={setSearch}
                setShowArchive={setShowArchive}
                sortAsc={sortAsc}
                sortType={sortType}
                setView={setView}
                view={view}
              />
            }
          />
          <div className="archive">
            {!showArchive && (
              <ArchiveBanner
                fadeout={fadeout}
                onClose={() => {
                  setFadeOut(true)
                }}
              />
            )}

            {loading && <Loading />}
            {!view ||
              (view === "grid" && !loading && (
                <ArchiveGrid
                  profiles={profilesSorted}
                  images={images}
                  setProfile={setProfile}
                />
              ))}
            {view === "table" && !loading && (
              <ArchiveTable
                profiles={profilesSorted}
                images={images}
                setProfile={setProfile}
              />
            )}
          </div>
        </>
      ) : (
        <Video
          profileId={profileId}
          name={profile && profile.full_name && profile.full_name[0].text}
          onClose={() => setProfile(null)}
          isArchive
        />
      )}
    </div>
  )
}

export default Archive
