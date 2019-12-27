import React from "react"

import "./TimelineSteps.css"

import { TIMELINE } from "../content/timeline"

const TimelineSteps = ({ step, onGoToStep }) => {
  return (
    <div className="timeline-steps">
      <div className="timeline-steps-labels">
        {TIMELINE.map((stepObj, idx) => {
          return (
            <div
              className={`timeline-step ${+step === idx ? "active" : ""}`}
              onClick={() => {
                onGoToStep(idx)
              }}
            >
              <div className="labels">
                <div className="upper-label">{stepObj.year}</div>
                <div className="actual-label">
                  {stepObj.title || stepObj.year}
                </div>
              </div>
              <div className="dot"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TimelineSteps
