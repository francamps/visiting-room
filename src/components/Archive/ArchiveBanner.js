import React from "react"

import CrossClose from "../CrossClose"

import "./ArchiveBanner.css"

const ArchiveBanner = ({ showGrid, fadeout, onClose }) => {
  return (
    <>
      <div className={`archive-banner fadein ${fadeout ? "fadeout" : ""}`}>
        {!showGrid && (
          <div className="archive-entry-text">
            <h2 className="fadein">Full Archive</h2>
            <p className="fadein">
              This collection includes full-length interviews with 110 people
              who are serving life without the possibility of parole at the
              Louisiana State Penitentiary, Angola.
            </p>

            <p className="fadein">
              The interviews were conducted by Professor Marcus Kondkar of
              Loyola University New Orleans in 2017 and 2018.
            </p>

            <p className="fadein">
              The best place to start is by visiting the Visiting Room.
            </p>
            <p className="fadein">
              For more information about the project, see our About page.
            </p>
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CrossClose onClick={onClose} primary />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ArchiveBanner
