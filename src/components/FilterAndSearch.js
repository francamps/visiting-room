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
  setSearchWords,
  setLoadingSearchResults,
}) => {
  const [isTooltip, setTooltip] = useState(false)
  const [searchInput, setSearchInput] = useState(null)
  const [search, setSearch] = useState(null)
  const [isTyping, setTyping] = useState(false)

  return (
    <>
      <div className="menu-button-tooltip search">
        <div className={`menu-tooltip ${isTooltip ? "active" : ""}`}>
          Search all interview transcripts for terms and mentions.
        </div>
        <button
          className="icon menu-button"
          onKeyUp={ev => {
            handleKeyUp(ev, () => {
              setView("table")
            })
          }}
          onMouseEnter={() => {
            setTooltip(true)
          }}
          onMouseLeave={() => {
            setTooltip(false)
          }}
          onClick={() => {
            setSearch(searchInput)
            setTyping(true)
            setView("table")
          }}
        >
          <IconSearch />
        </button>

        <span className={`input ${isTyping ? "active" : ""}`}>
          <form
            onSubmit={e => {
              e.preventDefault()
              setSearch(searchInput)
              setSearchWords(searchInput)
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
              placeholder="Search transcripts"
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
                setFilterTerms(null)
              }}
            >
              <IconClose noBackground />
            </div>
          </form>
        </span>
      </div>
      {search && (
        <FilterAndSearchResults
          search={search}
          setSearchResults={setSearchResults}
          setFilterTerms={setFilterTerms}
          setLoadingSearchResults={setLoadingSearchResults}
        />
      )}
    </>
  )
}

export default FilterAndSearch
