import React from "react"

import Paragraphs from "./Paragraphs"

import { TIMELINE } from "../content/timeline"

const TimelineLede = () => (
  <div className="step" data-step={`step-0`}>
    <h3>{TIMELINE[0].year}</h3>
    <div className="lede">
      <div className="lede-initial">I</div>
      <div className="lede-content step-0">
        <Paragraphs paragraphs={TIMELINE[0].paragraphs} />
      </div>
    </div>
  </div>
)

export default TimelineLede
