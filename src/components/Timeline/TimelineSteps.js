import React from "react"

import "./TimelineSteps.css"

const TimelineSteps = ({ step, slides, slideIdx, onGoToStep }) => {
  return (
    <div className={`timeline-steps`}>
      {slideIdx > 0 && (
        <div className="timeline-year-step fadein">
          <h3 className="year-label" style={{ margin: 0 }}>
            {slides.year}
          </h3>
          <h3 style={{ margin: 0 }}>{slides.title}</h3>
        </div>
      )}
      <div
        style={{
          width: (100 * slideIdx) / slides.sections.length + "%",
        }}
        className="timeline-progress"
      ></div>
    </div>
  )
}

export default TimelineSteps
