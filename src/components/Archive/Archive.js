import React, { useState } from "react"

import ArchiveActions from "./ArchiveActions"
import ArchiveGrid from "./ArchiveGrid"
import ArchiveTable from "./ArchiveTable"
import ArchiveTableSearchResults from "./ArchiveTableSearchResults"
import FilterAndSearch from "../FilterAndSearch"
import Header from "../Header"
import Loading from "../Loading"

import "./Archive.css"

const columns = [
  { key: "picture", label: "" },
  { key: "full_name", label: "Full Name" },
  { key: "age_at_offense", label: "Age at offense" },
  { key: "age_at_interview", label: "Age" },
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
  const [view, setView] = useState(params.get("search") ? "search" : "table")
  const [searchWords, setSearchWords] = useState(params.get("search") || null)
  const [isSearchLoading, setLoadingSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  return (
    <div className="archive-wrap">
      <Header
        title={"Archive"}
        theme="light"
        banner="ARCHIVE"
        actions={
          <>
            <FilterAndSearch
              searchWords={searchWords}
              setLoadingSearchResults={setLoadingSearchResults}
              setSearchResults={setSearchResults}
              setSearchWords={setSearchWords}
              setView={setView}
              theme="light"
              updateSearchParam={updateSearchParam}
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
            <ArchiveGrid
              profiles={profiles}
              images={images}
              sortType={sortType}
              sortAsc={sortAsc}
            />
          ))}
        {view === "table" && !loading && (
          <ArchiveTable
            images={images}
            profiles={profiles}
            sortType={sortType}
            sortAsc={sortAsc}
          />
        )}
        {view === "search" && !loading && (
          <ArchiveTableSearchResults
            images={images}
            isSearchLoading={isSearchLoading}
            profiles={profiles}
            searchResults={searchResults}
            searchWords={searchWords}
            sortType={sortType}
            sortAsc={sortAsc}
          />
        )}
      </div>
    </div>
  )
}

export default Archive
