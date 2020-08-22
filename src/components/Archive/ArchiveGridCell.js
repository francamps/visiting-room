import React, { useState } from "react"
import { navigate } from "gatsby"

import Play from "../Symbols/Play"
import GridCellBackground from "../GridCellBackground"
import getProfileProps from "../../utils/getProfileProps"

import { videos } from "../../content/archiveRegistry"

const USE_PRISMIC = true

const ArchiveGridCell = ({ profile, setProfile, profileIdx, images }) => {
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
        setProfile(profileUri)
        videos[fullName] && navigate(`/archive/?profile=${profileUri}`)
      }}
    >
      <GridCellBackground image={image} oldImage={oldImage} isHover={isHover} />
      <div className="cell-hover-layer">
        <div className="name">{fullName}</div>
        <div className="bottom">
          <div>
            <p>
              Incarcerated since
              <span
                style={{
                  whiteSpace: "pre",
                  height: "inherit",
                  color: "var(--clr-primary)",
                }}
              >
                {` ${date_of_offense}`}
              </span>
            </p>
            <p style={{ marginLeft: "0px" }}>
              Incarcerated for
              <span
                style={{ color: "var(--clr-primary)", whiteSpace: "pre" }}
              >{` ${current_age - age_at_offense} `}</span>
              <span>years</span>
            </p>
            {deceased_date && <p>{`Deceased on ${deceased_date}`}</p>}
          </div>
          {videos[fullName] ? (
            <p className="play" style={{ flex: "none" }}>
              <Play size="medium" />
            </p>
          ) : (
            <p style={{ opacity: 0.8 }}>Profile not available yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArchiveGridCell
