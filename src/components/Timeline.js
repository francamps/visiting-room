import React, { useEffect, useState } from "react"

import "./Timeline.css"

import Menu from "./Menu"
import Paragraphs from "./Paragraphs"
import TimelineFigure from "./TimelineFigure"
import TimelineSteps from "./TimelineSteps"
import TimelineLede from "./TimelineLede"
import TimelineFigureFocus from "./TimelineFigureFocus"
import TimelineModal from "./TimelineModal"

import { TIMELINE } from "../content/timeline"

function isElementInViewport(attribute) {
  const el = document.querySelector(`[data-step="${attribute}"] p`)
  if (!el) return null
  var rect = el.getBoundingClientRect()

  const container = document.querySelector(".copy-selector")
  const containerRect = container.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.top <= containerRect.height &&
    rect.bottom >= 0 &&
    rect.bottom <= containerRect.height
  )
}

function onVisibilityChange(attribute, callback) {
  return function() {
    if (isElementInViewport(attribute) && typeof callback === "function") {
      callback()
    }
  }
}

const IS_DYNAMIC = false

const Timeline = () => {
  const [isFigureActive, setFigureActive] = useState(null)
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [invertColor, setInvertColor] = useState(false)
  const [modalContent, setModal] = useState(false)

  useEffect(() => {
    TIMELINE.forEach((_, index) => {
      document
        .querySelector(".copy-selector")
        .addEventListener("scroll", () => {
          onVisibilityChange(`step-${index}`, function() {
            if (index === 2 && IS_DYNAMIC) setInvertColor(true)
            if (index === 4 && IS_DYNAMIC) setInvertColor(false)
            setStep(index)
            if (IS_DYNAMIC) setProgress(null /* TODO: calculate progress */)
          })()
        })
    })
  }, [])

  const goToStep = step => {
    const el = document.querySelector(`[data-step="step-${step}"]`)
    if (el) {
      el.scrollIntoView()
    }
  }

  return (
    <>
      <Menu theme="light" />
      <article>
        <div className="timeline-title">
          <div className="background" />
          <h2>The history of life without parole in Louisiana</h2>
        </div>
        <div className={`timeline-wrap ${invertColor ? "invert" : ""}`}>
          <div
            className="timeline-copy copy-selector"
            style={{
              flex: !!TIMELINE[step].paragraph,
              transition: "flex 0.4s",
            }}
          >
            <div className="copy" style={{ flex: 1 }}>
              <TimelineLede setModal={setModal} />

              {TIMELINE.slice(1).map((timelineStep, i) => {
                if (!timelineStep.paragraphs) return null

                return (
                  <>
                    {i === 1 && (
                      <div style={{ height: "300vh" }}>
                        <div className="map-figure" />
                      </div>
                    )}
                    <div className="step" data-step={`step-${i + 1}`}>
                      <h3 className="year-label">{timelineStep.year}</h3>
                      <h2>{timelineStep.title}</h2>
                      <div className={`step-${i + 1}`}>
                        <Paragraphs
                          paragraphs={timelineStep.paragraphs}
                          setModal={setModal}
                        />
                      </div>
                      <div
                        className={`timeline-figure ${
                          !!TIMELINE[step].image ? "figure-flex" : ""
                        }
                        ${step === 4 || step === 3 ? "figure-wide" : ""}`}
                      >
                        <TimelineFigure
                          step={i /* step */}
                          progress={progress}
                          caption={TIMELINE[step].caption}
                          setFigureActive={setFigureActive}
                        />
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>

        {isFigureActive && (
          <TimelineFigureFocus
            setFigureActive={setFigureActive}
            image={TIMELINE[step].image}
          />
        )}

        <TimelineSteps
          step={step}
          onGoToStep={d => {
            goToStep(d)
          }}
        />
        {modalContent && (
          <TimelineModal setModal={setModal} content={modalContent} />
        )}
      </article>
    </>
  )
}

export default Timeline
