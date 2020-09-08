import React from "react"

import ArchiveGridCell from "./ArchiveGridCell"

import "./ArchiveGrid.css"

const ArchiveGrid = ({ profiles, images }) => (
  <div className="archive-grid">
    {profiles.map((profile, profileIdx) => (
      <ArchiveGridCell
        key={`archive-grid-${profileIdx}`}
        profile={profile}
        profileIdx={profileIdx}
        images={images}
      />
    ))}
  </div>
)

export default ArchiveGrid
