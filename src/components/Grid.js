import React, { useState } from "react"
import chunk from "lodash/chunk"
import { useMediaQuery } from "react-responsive"

import GridChunk from "./GridChunk"

import "./Grid.css"

const Grid = ({ profiles = [], isLoadBackgrounds }) => {
  const [currentChunk, setCurrentChunk] = useState(0)
  // These media queries are aligned with the css break points
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1800px)" })
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const chunks = isLargeScreen ? 9 : isMobile ? 2 : 4
  const chunkWidth = isLargeScreen ? 3 : isMobile ? 1 : 2
  const profileChunks = chunk(profiles, chunks)

  return (
    <div className="outer-grid" dir="ltr">
      {profileChunks.map((profileChunk, chunkIdx) => {
        return (
          <GridChunk
            profileChunk={profileChunk}
            isLoadBackgrounds={isLoadBackgrounds}
            setCurrentChunk={() => {
              setCurrentChunk(chunkIdx)
            }}
          />
        )
      })}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          width: isLargeScreen ? "18px" : "10px",
          height: isLargeScreen ? "60px" : "90px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridAutoRows: "1fr",
          gridGap: "2px",
        }}
      >
        {profileChunks.map((p, idx) => {
          return (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${chunkWidth}, 1fr)`,
                gridGap: "2px",
              }}
            >
              {profileChunks[0].map(_ => {
                return (
                  <div
                    style={{
                      backgroundColor:
                        currentChunk === idx
                          ? "var(--clr-primary)"
                          : "var(--clr-mid-grey)",
                      transition: "background-color 1.2s",
                      borderRadius: "10px",
                    }}
                  ></div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Grid
