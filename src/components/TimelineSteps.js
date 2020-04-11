import React from "react"

import "./TimelineSteps.css"

import { TIMELINE } from "../content/timeline"

const TimelineSteps = ({ step, invertColor, onGoToStep }) => {
  return (
    <div
      className={`timeline-steps ${
        invertColor ? "invert" : ""
      } timeline-steps-${step}`}
    >
      <div className="timeline-steps-labels">
        {TIMELINE.map((stepObj, idx) => {
          return (
            <div
              className={`timeline-step-toc ${+step === idx ? "active" : ""}`}
              key={`step-${idx}`}
              onClick={() => {
                onGoToStep(idx)
              }}
            >
              {
                null /*<div className="labels">
                <div className="upper-label">{stepObj.year}</div>
              </div>*/
              }
              <div className="dot-wrap">
                <div className="dot"></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TimelineSteps
