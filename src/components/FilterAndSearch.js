import React, { useState } from "react"

import IconSearch from "./Symbols/Search"
import IconClose from "./Symbols/Close"
import FilterAndSearchResults from "./FilterAndSearchResults"
import { handleKeyUp } from "../utils"
import "./FilterAndSearch.css"

const FilterAndSearch = ({
  searchWords,
  searchResults,
  setView,
  setSearchResults,
  setSearchWords,
  setLoadingSearchResults,
  theme,
  updateSearchParam,
}) => {
  const [isTooltip, setTooltip] = useState(false)
  const [searchInput, setSearchInput] = useState(searchWords || null)
  const [isTyping, setTyping] = useState(false)

  return (
    <>
      <div className="menu-button-tooltip search">
        <div className={`menu-tooltip ${isTooltip ? "active" : ""}`}>
          Search interviews for key words
        </div>
        <button
          className={`icon menu-button ${
            theme === "light" ? "menu-light" : ""
          }`}
          onMouseEnter={() => {
            setTooltip(true)
          }}
          onMouseLeave={() => {
            setTooltip(false)
          }}
          onClick={() => {
            setTyping(true)
          }}
        >
          <IconSearch theme="light" />
        </button>

        <span className={`input ${isTyping ? "active" : ""}`}>
          <form
            onSubmit={e => {
              e.preventDefault()
              setSearchWords(searchInput)
              updateSearchParam(searchInput)
              setView("search")
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
                console.log(event.target.value)
                setSearchInput(event.target.value)
                updateSearchParam(event.target.value)
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
                setView("table")
              }}
            >
              <IconClose noBackground />
            </div>
          </form>
        </span>
      </div>
      {searchWords && (
        <FilterAndSearchResults
          searchWords={searchWords}
          setSearchResults={setSearchResults}
          setLoadingSearchResults={setLoadingSearchResults}
        />
      )}
    </>
  )
}

export default FilterAndSearch
