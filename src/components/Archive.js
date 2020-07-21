import React, { useState } from "react"

import Menu from "./Menu"
import ArchiveGrid from "./ArchiveGrid"
import ArchiveHeader from "./ArchiveHeader"

import "./Archive.css"

const columns = [
  { key: "picture", label: "" },
  { key: "full_name", label: "Full Name" },
  { key: "age_at_offense", label: "Age" },
  { key: "offense_date", label: "Year Incarcerated" },
]

const Archive = ({ profiles, images }) => {
  const [openProfile, setOpenProfile] = useState(null)
  const [openSearch, setOpenSearch] = useState(false)

  const [searchTerm, setSearch] = useState(null)
  const [sortAsc, setSortedAsc] = useState(true)
  const [sortType, setSortedType] = useState(columns[1])

  const [isShrunkHeader, setShrunkHeader] = useState(false)

  return (
    <div className="archive-wrap">
      <Menu isExpanded={false} />
      <div className="archive">
        <ArchiveHeader
          columns={columns}
          isShrunkHeader={isShrunkHeader}
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
          setOpenProfile={setOpenProfile}
          setSortedAsc={setSortedAsc}
          setSortedType={setSortedType}
          setSearch={setSearch}
          sortAsc={sortAsc}
          sortType={sortType}
        />

        {openSearch && (
          <div
            className="header-backdrop"
            onClick={() => setOpenSearch(false)}
          ></div>
        )}
        <ArchiveGrid
          profiles={profiles}
          images={images}
          sortAsc={sortAsc}
          sortType={sortType}
          searchTerm={searchTerm}
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
          setShrunkHeader={setShrunkHeader}
        />
      </div>
    </div>
  )
}

export default Archive
