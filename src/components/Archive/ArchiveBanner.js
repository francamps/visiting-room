import React from "react"

import CrossClose from "../CrossClose"

import "./ArchiveBanner.css"

const ArchiveBanner = ({ showGrid, setShowBanner, fadeout, onClose }) => {
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
              For more information about the project, see our About page.
            </p>
            <div className="link-wrap">
              <button
                onClick={() => {
                  window.localStorage.setItem("showBanner", "false")
                  setShowBanner(false)
                  onClose()
                }}
                className="hover-link"
              >
                Ok
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ArchiveBanner
