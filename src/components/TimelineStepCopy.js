import React from "react"

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
  const hasImage = timelineStep.images.length
  const imagePlacement = timelineStep.imagePlacement

  return (
    <div className="step-content-text">
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
              setStep(step + 1)
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
