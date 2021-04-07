import React, { useState } from "react"
import { navigate } from "gatsby"

import Play from "../Symbols/Play"
import ArchiveGridCellBackground from "./ArchiveGridCellBackground"
import getProfileProps from "../../utils/getProfileProps"
import { getNameUri } from "../../utils/index.js"
import { handleKeyUp } from "../../utils"
import { videos } from "../../content/archiveRegistry"

const ArchiveGridCell = ({ profile, images }) => {
  const [isHover, setHover] = useState(false)
  const {
    image,
    oldImage,
    fullName,
    date_of_offense,
    deceased_date,
  } = getProfileProps(profile)

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
        const profileUri = getNameUri(fullName)
        videos[fullName] && navigate(`/archive/${profileUri}`)
      }}
      onKeyUp={ev =>
        handleKeyUp(ev, () => {
          const profileUri = getNameUri(fullName)
          videos[fullName] && navigate(`/archive/${profileUri}`)
        })
      }
      role="link"
      tabIndex={0}
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
            <p style={{ opacity: 0.8 }}>Interview not available.</p>
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
