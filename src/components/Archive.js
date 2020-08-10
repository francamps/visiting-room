import React, { useEffect, useState } from "react"

import Menu from "./Menu"
import ArchiveGrid from "./ArchiveGrid"
import ArchiveHeader from "./ArchiveHeader"
import ArchiveTable from "./ArchiveTable"
import ArchiveBanner from "./ArchiveBanner"
import Loading from "./Loading"

import "./Archive.css"

const columns = [
  { key: "picture", label: "" },
  { key: "full_name", label: "Full Name" },
  { key: "age_at_offense", label: "Age" },
  { key: "offense_date", label: "Year Incarcerated" },
]

const Archive = ({ profiles, loading, images }) => {
  const [openProfile, setOpenProfile] = useState(null)
  const [openSearch, setOpenSearch] = useState(false)
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
  const [isShrunkHeader, setShrunkHeader] = useState(true)

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

  return (
    <div className="archive-wrap">
      <Menu isExpanded={false} />
      <div className="archive">
        {!showArchive && (
          <ArchiveBanner
            fadeout={fadeout}
            onClose={() => {
              setFadeOut(true)
            }}
          />
        )}
        <ArchiveHeader
          columns={columns}
          isShrunkHeader={true}
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
          setOpenProfile={setOpenProfile}
          setSortedAsc={setSortedAsc}
          setSortedType={setSortedType}
          setSearch={setSearch}
          setShowArchive={setShowArchive}
          sortAsc={sortAsc}
          sortType={sortType}
          setView={setView}
        />

        {openSearch && (
          <div
            className="header-backdrop"
            onClick={() => setOpenSearch(false)}
          ></div>
        )}
        {loading && <Loading />}
        {!view ||
          (view === "grid" && !loading && (
            <ArchiveGrid
              profiles={profiles}
              images={images}
              sortAsc={sortAsc}
              sortType={sortType}
              searchTerm={searchTerm}
              openProfile={openProfile}
              setOpenProfile={setOpenProfile}
              setShrunkHeader={setShrunkHeader}
            />
          ))}
        {view === "table" && !loading && (
          <ArchiveTable
            profiles={profiles}
            images={images}
            sortAsc={sortAsc}
            sortType={sortType}
            searchTerm={searchTerm}
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
            setShrunkHeader={setShrunkHeader}
          />
        )}
      </div>
    </div>
  )
}

export default Archive
