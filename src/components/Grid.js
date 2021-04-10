import React from "react"
import chunk from "lodash/chunk"
import { useMediaQuery } from "react-responsive"

import GridChunk from "./GridChunk"

import "./Grid.css"

const Grid = ({ profiles = [], isLoadBackgrounds }) => {
  // These media queries are aligned with the css break points
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1800px)" })
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const profileChunks = chunk(profiles, isLargeScreen ? 9 : isMobile ? 2 : 4)

  return (
    <div className="outer-grid" dir="ltr">
      {profileChunks.map(profileChunk => {
        return (
          <GridChunk
            profileChunk={profileChunk}
            isLoadBackgrounds={isLoadBackgrounds}
          />
        )
      })}
    </div>
  )
}

export default Grid
