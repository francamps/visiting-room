import React, { useEffect, useState, useRef } from "react"

import "./Timeline.css"

import Menu from "./Menu"
import Paragraphs from "./Paragraphs"
import TimelineFigure from "./TimelineFigure"
import TimelineSteps from "./TimelineSteps"
import TimelineLede from "./TimelineLede"
import TimelineFigureFocus from "./TimelineFigureFocus"
import TimelineModal from "./TimelineModal"
import TimelineTitle from "./TimelineTitle"

import TimelineAngolite from "./TimelineAngolite"

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
  const [isAngolite, setAngolite] = useState(false)

  function toggleColor() {
    if (
      timelineRef.current &&
      timelineRef.current.getBoundingClientRect().top < -440
    ) {
      setInvert(false)
    } else {
      setInvert(true)
    }
  }

  useEffect(() => {
    document.addEventListener("wheel", toggleColor)

    TIMELINE.forEach((_, index) => {
      document.addEventListener("wheel", () => {
        onVisibilityChange(`step-${index}`, function() {
          setStep(index)
          //if (IS_DYNAMIC) setProgress(null)
        })()
      })
    })

    return function removeWheelToggle() {
      document.removeEventListener("wheel", toggleColor)
    }
  }, [])

  // TODO: Disable the wheel on
  //useEffect(() => {}, [isAngolite])

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
        <TimelineTitle />
        <div
          className="timeline-copy"
          style={{
            flex: !!TIMELINE[step].paragraph,
            transition: "flex 0.4s",
          }}
        >
          <div className="copy" style={{ flex: 1 }}>
            <TimelineLede setModal={setModal} />
            {TIMELINE.slice(1).map((timelineStep, i) => {
              if (!timelineStep.paragraphs) return null
              const hasImage = timelineStep.image

              return (
                <div
                  key={`timeline-step-${i + 1}`}
                  className="timeline-step"
                  data-step={`step-${i + 1}`}
                  style={{
                    transform: "translate3d(0,0,0)",
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
                  {timelineStep.image && (
                    <>
                      <div style={{ width: "640px", height: "100vh" }}></div>
                      <div
                        className={`timeline-figure ${
                          !!hasImage ? "figure-flex" : ""
                        }
                        ${i === 4 || i === 3 ? "figure-wide long" : ""}`}
                        style={{
                          backgroundColor:
                            i === TIMELINE.slice(1).length - 1
                              ? "white"
                              : `rgb(${TONES[i]}, ${TONES[i]}, ${TONES[i]})`,
                        }}
                      >
                        <TimelineFigure
                          step={i}
                          progress={progress}
                          caption={timelineStep.caption}
                          setFigureActive={setFigureActive}
                        />
                        {i === 1 && (
                          <div
                            className="button"
                            style={{
                              width: "240px",
                              height: "20px",
                              lineHeight: "20px",
                              color: "black",
                              margin: "0 auto",
                              marginTop: "20px",
                              fontSize: "var(--font-small)",
                              background: "rgba(0,0,0,0.2)",
                              borderRadius: "4px",
                            }}
                            onClick={() => {
                              setAngolite(true)
                            }}
                          >
                            See the history of The Angolite >
                          </div>
                        )}
                      </div>
                      <div style={{ width: "640px", height: "100vh" }} />
                    </>
                  )}
                  {!timelineStep.image && (
                    <div style={{ width: "640px", height: "300vh" }}></div>
                  )}
                </div>
              )
            })}
          </div>
          {isAngolite && (
            <TimelineAngolite
              onClose={() => {
                setAngolite(false)
              }}
            />
          )}
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
