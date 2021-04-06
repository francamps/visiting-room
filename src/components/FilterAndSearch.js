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
      <div
        className="menu-button-tooltip search"
        style={{
          width: "240px",
          marginLeft: "-196px",
        }}
      >
        <div
          className={`menu-tooltip ${!isTyping && isTooltip ? "active" : ""}`}
          style={{ width: isTyping ? 0 : "140px" }}
        >
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
          onKeyUp={ev =>
            handleKeyUp(ev, () => {
              setTyping(true)
            })
          }
          aria-label="Open search input field"
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
              onKeyUp={ev =>
                handleKeyUp(ev, () => {
                  setTyping(false)
                  setSearchInput(null)
                  setView("table")
                })
              }
              role="button"
              tabIndex="0"
              aria-label="Clear search"
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
