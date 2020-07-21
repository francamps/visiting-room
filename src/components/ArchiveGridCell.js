import React, { useState } from "react"

import Years from "./charts/Years"
import Play from "./Play"
import GridCellBackground from "./GridCellBackground"
import getProfileProps from "../utils/getProfileProps"

const USE_PRISMIC = true

const ArchiveGridCell = ({
  profile,
  profileIdx,
  images,
  setOpenProfile,
  openProfile,
}) => {
  const [isHover, setHover] = useState(false)

  const {
    image,
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
        setOpenProfile(openProfile === profileIdx ? null : profileIdx)
      }}
    >
      <GridCellBackground image={image} />
      <div className="cell-hover-layer">
        <div className="name">{fullName}</div>
        <div className="bottom">
          <div>
            {isHover && (
              <Years
                incarcerated={age_at_offense}
                current={current_age}
                deceased_date={deceased_date}
              />
            )}
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
          <p className="play" style={{ flex: "none" }}>
            <Play size="medium" />
          </p>
        </div>
      </div>
    </div>
  )
}

export default ArchiveGridCell
