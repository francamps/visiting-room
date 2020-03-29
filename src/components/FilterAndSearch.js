import React from "react"

import IconSearch from "./Symbols/Search"

import "./FilterAndSearch.css"

const FilterAndSearch = ({ onSearchTyping }) => {
  return (
    <div className="header-options">
      <div className="header-option search">
        <IconSearch />
        <span className="input">
          <input
            className="input__field"
            type="text"
            id="input-search"
            placeholder="Type a name"
            onKeyUp={event => {
              onSearchTyping(event.target.value)
            }}
          />
          <label className="input__label" for="input-search">
            <span className="input__label-content">Search</span>
          </label>
        </span>
      </div>
      <div className="header-option">
        <span className="input">
          <input
            className="input__field"
            type="text"
            id="input-parrish"
            placeholder="Ex: New Orleans"
          />
          <label className="input__label" for="input-parrish">
            <span className="input__label-content">Filter by parrish</span>
          </label>
        </span>
      </div>
      <div className="header-option">
        <span className="input">
          <input
            className="input__field"
            type="text"
            id="input-parrish"
            placeholder="Ex: 25"
          />
          <label className="input__label" for="input-parrish">
            <span className="input__label-content">Filter by age</span>
          </label>
        </span>
      </div>
    </div>
  )
}

export default FilterAndSearch
