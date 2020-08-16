import React, { useState } from "react"

import TimelineStepTitle from "./TimelineStepTitle"
import Paragraphs from "../Paragraphs"

const THRESHOLD = 0.25

const TimelineStepCopy = ({
  section,
  setStep,
  setModal,
  setFigureActive,
  setAngolite,
  step,
  timelineStep,
  isLastStep,
}) => {
  const imagePlacement = timelineStep.imagePlacement
  const [active, setActive] = useState(false)

  return (
    <div
      key={`timeline-step-${step}`}
      className="timeline-step"
      data-step={`step-${step}`}
      style={{ position: "relative" }}
    >
      {section.title && (
        <TimelineStepTitle
          title={section.title}
          year={section.year}
          active={active}
        />
      )}
      <div className="step-content">
        {!section.title && section.paragraphs && (
          <div className={`step-${step} step-columns`}>
            <Paragraphs
              paragraphs={
                section ? section.paragraphs : timelineStep.paragraphs
              }
              setModal={setModal}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TimelineStepCopy
