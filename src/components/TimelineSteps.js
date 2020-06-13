import React from "react"

import "./TimelineSteps.css"

import { TIMELINE } from "../content/timeline"

const TimelineSteps = ({ step, onGoToStep }) => {
  return (
    <div className={`timeline-steps timeline-steps-${step}`}>
      {TIMELINE.map((stepObj, idx) => {
        return (
          <div
            className={`timeline-step-toc ${+step === idx ? "active" : ""}`}
            key={`step-${idx}`}
            onClick={() => {
              onGoToStep(idx)
            }}
          >
            <div className="dot-wrap">
              <div className="dot"></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TimelineSteps
