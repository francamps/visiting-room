import React, { useEffect, useState, useMemo } from "react"

import Header from "../Header"
import FilterAndSearch from "../FilterAndSearch"
import ArchiveGrid from "./ArchiveGrid"
import ArchiveActions from "./ArchiveActions"
import ArchiveTable from "./ArchiveTable"
import ArchiveTableSearchResults from "./ArchiveTableSearchResults"
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
  const [showBanner, setShowBanner] = useState(
    // TODO: Save in localStore once viewed, and pull from there
    typeof window !== "undefined" &&
      window.localStorage.getItem("showBanner") === "false"
      ? false
      : true
  )
  const [fadeout, setFadeOut] = useState(false)
  const [sortAsc, setSortedAsc] = useState(true)
  const [sortType, setSortedType] = useState(columns[1])
  const [view, setView] = useState("table")
  const [filterTerms, setFilterTerms] = useState(null)
  const [isSearchLoading, setLoadingSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const profilesSorted = useMemo(() => {
    return sortProfiles(profiles.slice(0), sortType, sortAsc).filter(
      profile => {
        if (filterTerms === null || filterTerms === "") return true
        if (filterTerms.includes(profile.full_name.text)) return true

        return false
      }
    )
  }, [JSON.stringify(profiles), sortAsc, sortType, filterTerms])

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

  return (
    <div className="archive-wrap">
      {!showBanner && (
        <Header
          title={"Archive"}
          setTitleHelp={() => {
            window.localStorage.setItem("showBanner", "true")
            setShowBanner(true)
          }}
          actions={
            <>
              <FilterAndSearch
                setFilterTerms={setFilterTerms}
                setSearchResults={setSearchResults}
                setView={setView}
                setLoadingSearchResults={setLoadingSearchResults}
              />
              <ArchiveActions
                columns={columns}
                setSortedAsc={setSortedAsc}
                setSortedType={setSortedType}
                sortAsc={sortAsc}
                sortType={sortType}
                setView={setView}
                view={view}
              />
            </>
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
        {view === "table" &&
          !loading &&
          (!filterTerms || filterTerms === "") && (
            <ArchiveTable
              profiles={profilesSorted}
              filterTerms={filterTerms}
              images={images}
              isSearchLoading={isSearchLoading}
            />
          )}
        {view === "table" &&
          !loading &&
          (filterTerms || filterTerms !== "") && (
            <ArchiveTableSearchResults
              isSearchLoading={isSearchLoading}
              profiles={profilesSorted}
              images={images}
              searchResults={searchResults}
              filterTerms={filterTerms}
            />
          )}
      </div>
    </div>
  )
}

export default Archive
