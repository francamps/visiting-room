import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import Paragraphs from "./Paragraphs"
import TimelineFigure from "./TimelineFigure"
import Caret from "./Caret"

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
  const [ref, inView, entry] = useInView({ threshold: 0.25 })

  useEffect(() => {
    if (inView) {
      setStep(+step)
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
      <div className="step-title">
        <h3 className="year-label">{timelineStep.year}</h3>
        <h2>{timelineStep.title}</h2>
      </div>
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
