import React from "react"

import Paragraphs from "./Paragraphs"

import { TIMELINE } from "../content/timeline"

const TimelineLede = ({ setModal }) => (
  <div className="timeline-step" data-step={`step-0`}>
    <div className="step-content">
      <h3 className="year-label" style={{ color: "white" }}>
        {TIMELINE[0].year}
      </h3>
      <h2>{TIMELINE[0].title}</h2>
      <div className="lede">
        <div className="lede-initial">I</div>
        <div className="lede-content step-0" style={{ color: "white" }}>
          <Paragraphs paragraphs={TIMELINE[0].paragraphs} setModal={setModal} />
        </div>
      </div>
    </div>
    <div style={{ width: "640px", height: "200vh" }}></div>
  </div>
)

export default TimelineLede
