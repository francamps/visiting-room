import React from "react"
import "./TimelineBanner.css"

import CrossClose from "./CrossClose"
//import Loading from "./Loading"

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
              Life without parole - a sentence to die in prison without any
              possibility of release - is a largely American phenomenon. The
              United States accounts for more than 80% of these sentences
              worldwide. Louisiana has the highest proportion (15%) of its
              incarcerated population serving life without parole of any state
              in the country, while Pennsylvania has the highest number. The
              extent to which other states use the sentence depends on a
              confluence of local factors, state politics, and national trends.
            </p>
            <p>
              Here is a summary of the origins of life without parole in
              Louisiana, compiled in large part from the meticulously
              researched, contemporaneous accounts of writers at Angola’s prison
              newspaper, The Angolite.
            </p>
            {null /*<Loading />*/}
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

export default TimelineBanner
