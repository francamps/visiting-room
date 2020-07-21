import React, { useEffect, useRef } from "react"
import getValue from "lodash/get"
//import { useInView } from "react-intersection-observer"

const TimelineStepTitle = ({ title, year, active }) => {
  console.log(year, active)
  return (
    <div
      className="step-title"
      style={active ? { backgroundColor: "var(--clr-off-white)" } : {}}
    >
      <h3 className="year-label">{year}</h3>
      <h2>{title}</h2>
    </div>
  )
}

export default TimelineStepTitle
