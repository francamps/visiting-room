import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import Paragraphs from "./Paragraphs"
import TimelineFigure from "./TimelineFigure"
import TimelineStepTitle from "./TimelineStepTitle"
import Caret from "./Caret"

const THRESHOLD = 0.25

const TimelineStepCopy = ({
  timelineStep,
  step,
  setStep,
  setModal,
  setFigureActive,
  setAngolite,
  isLastStep,
}) => {
  const imagePlacement = timelineStep.imagePlacement
  const [ref, inView, entry] = useInView({ threshold: 0.7 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (inView) {
      setStep(+step)
      setActive(true)
    } else {
      setActive(false)
    }
    return
  }, [inView])

  return (
    <div
      key={`timeline-step-${step}`}
      className="timeline-step"
      data-step={`step-${step}`}
      style={{ position: "relative" }}
      ref={ref}
    >
      <TimelineStepTitle
        title={timelineStep.title}
        year={timelineStep.year}
        active={active}
      />
      <div className="step-content">
        {imagePlacement && imagePlacement === "top" && (
          <div className="step-content-figure">
            <TimelineFigure
              step={step}
              caption={timelineStep.caption}
              images={timelineStep.images}
              imageStyle={timelineStep.imageStyle}
              setFigureActive={setFigureActive}
              setAngolite={setAngolite}
            />
          </div>
        )}
        <div className={`step-${step} step-columns`}>
          <Paragraphs
            paragraphs={timelineStep.paragraphs}
            setModal={setModal}
          />
        </div>
        {imagePlacement && imagePlacement === "bottom" && (
          <div className="step-content-figure">
            <TimelineFigure
              step={step}
              caption={timelineStep.caption}
              images={timelineStep.images}
              imageStyle={timelineStep.imageStyle}
              setFigureActive={setFigureActive}
              setAngolite={setAngolite}
            />
          </div>
        )}
        {!isLastStep && (
          <div
            className="scroll"
            onClick={() => {
              setStep(+step + 1)
            }}
          >
            <Caret animate={true} color={"var(--clr-primary)"} />
          </div>
        )}
      </div>
    </div>
  )
}

export default TimelineStepCopy
