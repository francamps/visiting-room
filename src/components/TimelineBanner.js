import React from "react"
import "./TimelineBanner.css"

import Caret from "./Caret"

const TimelineBanner = ({ showGrid, fadeout, onClose }) => {
  return (
    <>
      <div className={`timeline-banner ${fadeout ? "fadeout" : ""}`}>
        {!showGrid && (
          <div className="timeline-entry-text">
            <h2 style={{ textAlign: "center" }}>
              A History of Life Without Parole in Louisiana
            </h2>
            <p>
              Louisiana sentences more people to life without parole per capita
              than any other state in the U.S. Below is a history of the
              sentence in Louisiana, drawn largely from research from The
              Angolite, an award- winning magazine edited and published by
              people serving time at Angola.
            </p>
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Caret onClick={onClose} black />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default TimelineBanner
