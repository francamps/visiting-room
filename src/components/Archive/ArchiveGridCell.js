import React, { useState } from "react"
import { navigate } from "gatsby"

import Play from "../Symbols/Play"
import ArchiveGridCellBackground from "./ArchiveGridCellBackground"
import getProfileProps from "../../utils/getProfileProps"

import { videos } from "../../content/archiveRegistry"

const USE_PRISMIC = true

const ArchiveGridCell = ({ profile, profileIdx, images }) => {
  const [isHover, setHover] = useState(false)

  const {
    image,
    oldImage,
    fullName,
    date_of_offense,
    age_at_offense,
    current_age,
    deceased_date,
    profile_picture,
  } = getProfileProps(profile, images, USE_PRISMIC)

  return (
    <div
      className="open grid-cell"
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      onClick={() => {
        const profileUri = fullName.toLowerCase().replace(/ /g, "_")
        videos[fullName] && navigate(`/archive/${profileUri}`)
      }}
    >
      <ArchiveGridCellBackground
        image={image}
        oldImage={oldImage}
        isHover={isHover}
      />
      <div className="cell-hover-layer">
        <div className="bottom">
          {videos[fullName] ? (
            <p className="play" style={{ flex: "none" }}>
              <Play size="medium" />
            </p>
          ) : (
            <p style={{ opacity: 0.8 }}>Profile not available yet.</p>
          )}
          <div>
            <div className="name">{fullName}</div>
            <p>
              Incarcerated since
              <span
                style={{
                  whiteSpace: "pre",
                  height: "inherit",
                  fontWeight: "700",
                }}
              >
                {` ${date_of_offense}`}
              </span>
            </p>
            {deceased_date && <p>{`Deceased on ${deceased_date}`}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchiveGridCell
