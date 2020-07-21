import React, { useEffect, useState, useRef, useCallback } from "react"

import "./Timeline.css"

import Menu from "./Menu"
import TimelineSteps from "./TimelineSteps"
import TimelineFigureFocus from "./TimelineFigureFocus"
import TimelineModal from "./TimelineModal"
import TimelineStepCopy from "./TimelineStepCopy"
import TimelineBanner from "./TimelineBanner"

import { TIMELINE } from "../content/timeline"

const Timeline = props => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  const [isFigureActive, setFigureActive] = useState(null)
  const [step, setStep] = useState(params.get("chapter") || 0)
  const timelineRef = useRef()
  const [modalContent, setModal] = useState(false)

  const [fadeout, setFadeOut] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)

  useEffect(() => {
    let timer1 = setTimeout(() => setFadeOut(true), 60000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  useEffect(() => {
    if (fadeout) {
      let timer2 = setTimeout(() => {
        setShowTimeline(true)
        setFadeOut(false)
      }, 1200)

      return () => {
        clearTimeout(timer2)
      }
    }
  }, [fadeout])

  const updateParams = step => {
    params.set("chapter", step)
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
  }

  const keyToStep = useCallback(
    e => {
      if (e.code === "ArrowDown") {
        if (step < TIMELINE.length - 1) setStep(step + 1)
      } else if (e.code === "ArrowUp") {
        if (step > 0) setStep(step - 1)
      }
    },
    [step]
  )

  useEffect(() => {})

  useEffect(() => {
    window.addEventListener("keyup", keyToStep)
    return () => {
      window.removeEventListener("keyup", keyToStep)
    }
  }, [keyToStep])

  useEffect(() => {
    const el = document.querySelector(`[data-step="step-${step}"]`)
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [step])

  const isLastStep = step >= TIMELINE.length - 1

  return (
    <>
      {!showTimeline && (
        <TimelineBanner
          fadeout={fadeout}
          onClose={() => {
            setFadeOut(true)
          }}
        />
      )}
      <>
        <Menu theme="light" />
        <article className="timeline" ref={timelineRef}>
          <div className="timeline-frame">
            {TIMELINE.map((timelineStep, stepIdx) => {
              return (
                timelineStep.paragraphs && (
                  <TimelineStepCopy
                    key={stepIdx}
                    step={stepIdx}
                    timelineStep={timelineStep}
                    setModal={setModal}
                    setFigureActive={setFigureActive}
                    isLastStep={isLastStep}
                    setStep={step => {
                      updateParams(+step)
                      setStep(+step)
                    }}
                  />
                )
              )
            })}
            <TimelineSteps
              step={step}
              onGoToStep={s => {
                setStep(s)
              }}
            />
          </div>

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
    </>
  )
}

export default Timeline
