import React, { useEffect, useState, useMemo } from "react"

import ArchiveActions from "./ArchiveActions"
import ArchiveGrid from "./ArchiveGrid"
import ArchiveTable from "./ArchiveTable"
import ArchiveTableSearchResults from "./ArchiveTableSearchResults"
import FilterAndSearch from "../FilterAndSearch"
import Header from "../Header"
import Loading from "../Loading"

import sortProfiles from "../../utils/sortProfiles"

import "./Archive.css"

const columns = [
  { key: "picture", label: "" },
  { key: "full_name", label: "Full Name" },
  { key: "age_at_offense", label: "Age at offense" },
  { key: "current_age", label: "Age" },
  { key: "offense_date", label: "Incarcerated since" },
]

const Archive = ({ profiles = [], loading, images }) => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  const updateSearchParam = searchWords => {
    params.set("search", searchWords)
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
  }

  const [sortAsc, setSortedAsc] = useState(true)
  const [sortType, setSortedType] = useState(columns[1])
  const [view, setView] = useState("table")
  const [filterTerms, setFilterTerms] = useState(null)
  const [searchWords, setSearchWords] = useState(params.get("search") || null)
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

  return (
    <div className="archive-wrap">
      <Header
        title={"Full Archive"}
        theme="light"
        banner="ARCHIVE"
        actions={
          <>
            <FilterAndSearch
              searchWords={searchWords}
              setFilterTerms={setFilterTerms}
              setSearchResults={setSearchResults}
              setSearchWords={setSearchWords}
              setView={setView}
              setLoadingSearchResults={setLoadingSearchResults}
              updateSearchParam={updateSearchParam}
              theme="light"
            />
            <ArchiveActions
              columns={columns}
              setSortedAsc={setSortedAsc}
              setSortedType={setSortedType}
              sortAsc={sortAsc}
              sortType={sortType}
              setView={setView}
              view={view}
              theme="light"
            />
          </>
        }
      />
      <div className="archive">
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
        {view === "table" && !loading && filterTerms && filterTerms !== "" && (
          <ArchiveTableSearchResults
            isSearchLoading={isSearchLoading}
            profiles={profilesSorted}
            images={images}
            searchResults={searchResults}
            searchWords={searchWords}
          />
        )}
      </div>
    </div>
  )
}

export default Archive
