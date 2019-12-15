import React from "react"

import "./TimelineSteps.css"

import { TIMELINE } from "../content/timeline"

const TimelineSteps = ({ step, onGoToStep }) => {
  return (
    <div className="timeline-steps">
      {TIMELINE.map((stepObj, idx) => {
        return (
          <div
            className={`timeline-step ${+step === idx ? "active" : ""}`}
            onClick={() => {
              onGoToStep(idx)
            }}
          >
            <div className="upper-label">{stepObj.year}</div>
            <div className="actual-label">{stepObj.title || stepObj.year}</div>
          </div>
        )
      })}
    </div>
  )
}

export default TimelineSteps
