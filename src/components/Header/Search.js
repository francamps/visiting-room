import React from "react"

const Search = ({}) => {
  return (
    <div className={`header-content ${openSearch ? "open" : ""} `}>
      {!openSearch && (
        <div
          className="search-trigger"
          onClick={() => {
            setOpenSearch(true)
          }}
        >
          <IconSearch />
        </div>
      )}
      {openSearch && <FilterAndSearch onSearchTyping={onSearchTyping} />}
    </div>
  )
}

export default Search
