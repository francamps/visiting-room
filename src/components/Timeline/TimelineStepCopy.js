import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import Paragraphs from "../Paragraphs"
import Caret from "../Caret"
import Foreword from "./Foreword"
import TimelineFigure from "./TimelineFigure"
import TimelineStepTitle from "./TimelineStepTitle"

const TimelineStepCopy = ({
  setModal,
  setFigureActive,
  step,
  stepIdx,
  setHeaderBreadcrump,
  timelineStep,
}) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.5,
  })

  useEffect(() => {
    setHeaderBreadcrump(timelineStep.year)
  }, [inView])

  return (
    <div key={stepIdx}>
      <div className="slide">
        <div className="timeline-step">
          <div
            className={
              inView && timelineStep.title ? "title-wrap in-view" : "title-wrap"
            }
            ref={ref}
          >
            {timelineStep.title && (
              <TimelineStepTitle
                title={timelineStep.title}
                year={timelineStep.year}
              />
            )}
          </div>
        </div>
      </div>
      {timelineStep.imagePlacement && (
        <div className="slide">
          <div className="timeline-step">
            <div className="step-content">
              <div
                className={`step-content-figure ${
                  stepIdx % 2 === 0 && stepIdx !== 4 ? "left" : "right"
                } ${stepIdx === 4 ? "wide" : ""}`}
              >
                <TimelineFigure
                  step={step}
                  caption={timelineStep.caption}
                  images={timelineStep.images}
                  imageStyle={timelineStep.imageStyle}
                  setFigureActive={setFigureActive}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {timelineStep.sections.map(section => (
        <div className={"slide"}>
          <div
            key={`timeline-step-${stepIdx}`}
            className={`timeline-step timeline-step-${stepIdx}`}
            data-step={`step-${stepIdx}`}
            style={{ position: "relative" }}
          >
            {!section.title && section.paragraphs && (
              <div className="step-content">
                <div className={`step-${step} step-columns`}>
                  <Paragraphs
                    step={step}
                    paragraphs={
                      section ? section.paragraphs : timelineStep.paragraphs
                    }
                    setModal={setModal}
                  />
                </div>
              </div>
            )}
            {!stepIdx && (
              <>
                <Foreword />
                <Caret />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimelineStepCopy
