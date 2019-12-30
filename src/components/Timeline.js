import React, { useEffect, useState, useRef } from "react"

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
  const el = document.querySelector(`[data-step="${attribute}"]`)
  if (!el) return null
  const rect = el.getBoundingClientRect()

  return rect.top >= -window.innerHeight && rect.top < 0
}

function onVisibilityChange(attribute, callback) {
  return function() {
    if (isElementInViewport(attribute) && typeof callback === "function") {
      callback()
    }
  }
}

const IS_DYNAMIC = false

const TONES = Array(TIMELINE.length)
  .fill(0)
  .map(d => Math.floor(225 + Math.random() * 30))

const Timeline = () => {
  const [isFigureActive, setFigureActive] = useState(null)
  const [step, setStep] = useState(0)
  const timelineRef = useRef()
  const [progress, setProgress] = useState(0)
  const [modalContent, setModal] = useState(false)
  const [invertColor, setInvert] = useState(true)

  function toggleColor() {
    if (timelineRef.current.getBoundingClientRect().top < -440) {
      setInvert(false)
    } else {
      setInvert(true)
    }
  }

  useEffect(() => {
    document.addEventListener("wheel", () => {
      toggleColor()
    })

    TIMELINE.forEach((_, index) => {
      document.addEventListener("wheel", () => {
        onVisibilityChange(`step-${index}`, function() {
          setStep(index)
          if (IS_DYNAMIC) setProgress(null /* TODO: calculate progress */)
        })()
      })
    })
  }, [])

  const goToStep = step => {
    const el = document.querySelector(`[data-step="step-${step}"]`)
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <Menu theme="light" />
      <article className="timeline" ref={timelineRef}>
        <div className="timeline-title">
          <div className="background" />
          <h2>The history of life without parole in Louisiana</h2>
        </div>
        <div
          className="timeline-copy"
          style={{
            flex: !!TIMELINE[step].paragraph,
            transition: "flex 0.4s",
          }}
        >
          <div className="copy" style={{ flex: 1 }}>
            <TimelineLede setModal={setModal} />
            <div style={{ height: "300vh" }}>
              <div className="map-figure" />
              <div style={{ height: "200vh" }}></div>
            </div>
            {TIMELINE.slice(1).map((timelineStep, i) => {
              if (!timelineStep.paragraphs) return null

              return (
                <div
                  key={`timeline-step-${i + 1}`}
                  className="step"
                  data-step={`step-${i + 1}`}
                  style={{
                    backgroundColor: `rgb(${TONES[i]}, ${TONES[i]}, ${TONES[i]})`,
                  }}
                >
                  <div className="step-content">
                    <h3 className="year-label">{timelineStep.year}</h3>
                    <h2>{timelineStep.title}</h2>
                    <div className={`step-${i + 1} step-columns`}>
                      <Paragraphs
                        paragraphs={timelineStep.paragraphs}
                        setModal={setModal}
                      />
                    </div>
                  </div>
                  {TIMELINE[step].image && (
                    <>
                      <div style={{ width: "640px", height: "100vh" }}></div>
                      <div
                        className={`timeline-figure ${
                          !!TIMELINE[step].image ? "figure-flex" : ""
                        }
                        ${step === 4 || step === 3 ? "figure-wide" : ""}`}
                        style={{
                          backgroundColor: `rgb(${TONES[i]}, ${TONES[i]}, ${TONES[i]})`,
                        }}
                      >
                        <TimelineFigure
                          step={i /* step */}
                          progress={progress}
                          caption={TIMELINE[step].caption}
                          setFigureActive={setFigureActive}
                        />
                      </div>
                      <div style={{ width: "640px", height: "100vh" }}></div>
                    </>
                  )}
                  {!TIMELINE[step].image && (
                    <div style={{ width: "640px", height: "300vh" }}></div>
                  )}
                </div>
              )
            })}
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
          invertColor={invertColor}
          onGoToStep={d => {
            setStep(d)
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
