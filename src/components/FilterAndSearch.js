import React, { useState } from "react"

import IconSearch from "./Symbols/Search"
import IconClose from "./Symbols/Close"
import FilterAndSearchResults from "./FilterAndSearchResults"
import { handleKeyUp } from "../utils"
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
          onKeyUp={ev => {
            handleKeyUp(ev, () => {
              setView("table")
            })
          }}
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
              style={{
                display: "flex",
                position: "relative",
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
              <div
                className=""
                style={{
                  right: "0px",
                  bottom: "5px",
                  position: "absolute",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setTyping(false)
                  setSearchInput(null)
                }}
              >
                <IconClose noBackground />
              </div>
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
