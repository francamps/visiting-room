import React, { useEffect, useState, useRef } from "react"
import "./Timeline.css"

import Menu from "./Menu"
import TimelineSteps from "./TimelineSteps"
import TimelineFigureFocus from "./TimelineFigureFocus"
import TimelineModal from "./TimelineModal"
import TimelineStepCopy from "./TimelineStepCopy"

//import TimelineAngolite from "./TimelineAngolite"

import { TIMELINE } from "../content/timeline"

const Timeline = () => {
  const [isFigureActive, setFigureActive] = useState(null)
  const [step, setStep] = useState(0)
  const timelineRef = useRef()
  const [modalContent, setModal] = useState(false)
  const [isAngolite, setAngolite] = useState(false)

  const handleTouchStart = () => {
    console.log("handleTouchStart")
  }
  const handleTouchMove = () => {
    console.log("handleTouchMove")
  }
  const handleTouchEnd = () => {
    console.log("handleTouchEnd")
  }

  const keyToStep = e => {
    if (e.code === "ArrowDown") {
      if (step < TIMELINE.length - 1) setStep(step + 1)
    } else if (e.code === "ArrowUp") {
      if (step > 0) setStep(step - 1)
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", keyToStep)
    return () => {
      window.removeEventListener("keyup", keyToStep)
    }
  }, [keyToStep])

  // TODO: Disable the wheel on
  //useEffect(() => {}, [isAngolite])

  useEffect(() => {
    const el = document.querySelector(`[data-step="step-${step}"]`)
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [step])

  const isLastStep = step >= TIMELINE.length - 1

  const timelineStep = TIMELINE[step]

  return (
    <>
      <Menu theme="light" />
      <article className="timeline" ref={timelineRef}>
        <div className="timeline-frame">
          {timelineStep.paragraphs && (
            <>
              <div className="timeline-step-wrap" data-step={`step-${step}`}>
                <div
                  key={`timeline-step-${step}`}
                  className="timeline-step"
                  style={{ position: "relative" }}
                >
                  <div className="step-title">
                    <h3 className="year-label">{timelineStep.year}</h3>
                    <h2>{timelineStep.title}</h2>
                  </div>
                  <TimelineStepCopy
                    step={step}
                    timelineStep={timelineStep}
                    setModal={setModal}
                    setFigureActive={setFigureActive}
                    isLastStep={isLastStep}
                    setStep={setStep}
                  />
                </div>
              </div>
              <TimelineSteps
                step={step}
                onGoToStep={s => {
                  setStep(s)
                }}
              />
            </>
          )}
        </div>

        {
          null /*isAngolite && (
          <TimelineAngolite
            onClose={() => {
              setAngolite(false)
            }}
          />
          )*/
        }

        {isFigureActive && (
          <TimelineFigureFocus
            setFigureActive={setFigureActive}
            image={TIMELINE[step].image}
          />
        )}

        {modalContent && (
          <TimelineModal setModal={setModal} content={modalContent} />
        )}
      </article>
    </>
  )
}

export default Timeline
