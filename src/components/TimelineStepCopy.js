import React from "react"

import Paragraphs from "./Paragraphs"
import TimelineFigure from "./TimelineFigure"

const TimelineStepCopy = ({
  timelineStep,
  step,
  setModal,
  setFigureActive,
  setAngolite,
}) => {
  const hasImage = timelineStep.images.length
  const imagePlacement = timelineStep.imagePlacement

  return (
    <div className="step-content-text">
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
      </div>
    </div>
  )
}

export default TimelineStepCopy
