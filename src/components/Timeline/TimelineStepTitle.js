import React from "react"

const TimelineStepTitle = ({ title, year }) => {
  return (
    <div
      className="step-title"
      style={false ? { backgroundColor: "var(--clr-off-white)" } : {}}
    >
      <h4 className="year-label">{year}</h4>
      <h3 className="title-title">{title}</h3>
    </div>
  )
}

export default TimelineStepTitle
