import React, { useEffect, useRef } from "react"
import getValue from "lodash/get"
//import { useInView } from "react-intersection-observer"

const TimelineStepTitle = ({ title, year, active }) => {
  return (
    <div
      className="step-title"
      style={false ? { backgroundColor: "var(--clr-off-white)" } : {}}
    >
      <h3 className="year-label">{year}</h3>
      <div
        style={{
          fontSize: "var(--font-xlarge)",
          color: "var(--clr-black)",
          fontFamily: "EB Garamond",
          textAlign: "center",
        }}
      >
        {title}
      </div>
    </div>
  )
}

export default TimelineStepTitle
