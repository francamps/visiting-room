import React from "react"

import CrossClose from "../CrossClose"

import "./ArchiveBanner.css"

const ArchiveBanner = ({ showGrid, setShowArchive, fadeout, onClose }) => {
  return (
    <>
      <div className={`archive-banner fadeinfast ${fadeout ? "fadeout" : ""}`}>
        {!showGrid && (
          <div className="archive-entry-text">
            <h2 className="fadeinfast">Full Archive</h2>
            <p className="fadeinfast">
              This collection includes full-length interviews with 110 people
              who are serving life without the possibility of parole at the
              Louisiana State Penitentiary, Angola.
            </p>

            <p className="fadeinfast">
              The interviews were conducted by Professor Marcus Kondkar of
              Loyola University New Orleans in 2017 and 2018.
            </p>

            <p className="fadeinfast">
              The best place to start is by visiting the Visiting Room.
            </p>
            <p className="fadeinfast">
              For more information about the project, see our About page.
            </p>
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p
                onClick={() => {
                  window.localStorage.setItem("showArchive", "false")
                  setShowArchive(false)
                  onClose()
                }}
                style={{ fontSize: "var(--font-copy)", cursor: "pointer" }}
              >
                Do not show me this again.
              </p>
              <CrossClose onClick={onClose} primary />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ArchiveBanner