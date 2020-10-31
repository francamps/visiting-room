import React, { useEffect, useState, lazy } from "react"

import IconSearch from "./Symbols/Search"
import FilterAndSearchResults from "./FilterAndSearchResults"

import "./FilterAndSearch.css"

const FilterAndSearch = ({
  setFilterTerms,
  setView,
  setSearchResults,
  setLoadingSearchResults,
}) => {
  const [searchInput, setSearchInput] = useState(null)
  const [search, setSearch] = useState(null)
  const [isTyping, setTyping] = useState(false)

  return (
    <div className="header-options">
      <div className="header-option search">
        <div
          className="icon"
          onClick={() => {
            setSearch(searchInput)
            setTyping(true)
            setView("table")
          }}
        >
          <IconSearch />
        </div>
        {isTyping && (
          <span className="input">
            <form
              onSubmit={e => {
                e.preventDefault()
                setSearch(searchInput)
              }}
            >
              <input
                className="input__field"
                type="text"
                id="input-search"
                placeholder="Search something..."
                onKeyUp={event => {
                  setSearchInput(event.target.value)
                }}
              />
            </form>
          </span>
        )}
      </div>
      {search && (
        <FilterAndSearchResults
          search={search}
          setSearchResults={setSearchResults}
          setFilterTerms={setFilterTerms}
          setLoadingSearchResults={setLoadingSearchResults}
        />
      )}
    </div>
  )
}

export default FilterAndSearch
