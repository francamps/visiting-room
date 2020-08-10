import React from "react"

import "./TimelineSteps.css"

import { TIMELINE } from "../content/timeline"

const TimelineSteps = ({ step, slides, slideIdx, onGoToStep }) => {
  return (
    <div className={`timeline-steps`}>
      {
        null /*slides.map((slide, idx) => {
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
      })*/
      }
      {slideIdx > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: 0,
            width: "100%",
            textAlign: "center",
            color: "var(--clr-black)",
          }}
          className="fadein"
        >
          <h3 className="year-label" style={{ margin: 0 }}>
            {slides.year}
          </h3>
          <h3 style={{ margin: 0 }}>{slides.title}</h3>
        </div>
      )}
      <div
        style={{
          width: (100 * slideIdx) / slides.sections.length + "%",
          height: "20px",
          background: "black",
          position: "fixed",
          bottom: 0,
          left: 0,
          transition: "width 1.2s",
        }}
      ></div>
    </div>
  )
}

export default TimelineSteps
