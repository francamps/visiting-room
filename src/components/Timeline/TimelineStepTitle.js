import React from "react"

const TimelineStepTitle = ({ title, year }) => {
  return (
    <div
      className="step-title"
      style={false ? { backgroundColor: "var(--clr-off-white)" } : {}}
    >
      <h3 className="year-label">{year}</h3>
      <div className="title-title">{title}</div>
    </div>
  )
}

export default TimelineStepTitle
