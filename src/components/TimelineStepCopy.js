import React, { useEffect, useState } from "react"
//import { useInView } from "react-intersection-observer"

import Paragraphs from "./Paragraphs"
import TimelineFigure from "./TimelineFigure"
import TimelineStepTitle from "./TimelineStepTitle"
import Caret from "./Caret"

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
  //const [ref, inView, entry] = useInView({ threshold: 0.7 })
  const [active, setActive] = useState(false)

  /*useEffect(() => {
    if (inView) {
      setStep(+step)
      setActive(true)
    } else {
      setActive(false)
    }
    return
  }, [inView])*/

  console.log(section)

  return (
    <div
      key={`timeline-step-${step}`}
      className="timeline-step"
      data-step={`step-${step}`}
      style={{ position: "relative" }}
      ref={null /*ref*/}
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
