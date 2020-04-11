import React, { useEffect, useState, useRef } from "react"
import { debounce } from "lodash"
import "./Timeline.css"

import Menu from "./Menu"
import Paragraphs from "./Paragraphs"
import TimelineFigure from "./TimelineFigure"
import TimelineSteps from "./TimelineSteps"
// import TimelineLede from "./TimelineLede"
import TimelineFigureFocus from "./TimelineFigureFocus"
import TimelineModal from "./TimelineModal"
// import TimelineTitle from "./TimelineTitle"

import TimelineAngolite from "./TimelineAngolite"
import Caret from "./Caret"

import { TIMELINE } from "../content/timeline"

/*function isElementInViewport(attribute) {
  const el = document.querySelector(`[data-step="${attribute}"]`)
  if (!el) return null
  const rect = el.getBoundingClientRect()

  return rect.top >= -window.innerHeight && rect.top < 0
}*/

/*function onVisibilityChange(attribute, callback) {
  return function() {
    if (isElementInViewport(attribute) && typeof callback === "function") {
      callback()
    }
  }
}*/

//const IS_DYNAMIC = false

function useKey(key) {
  // Keep track of key state
  const [pressed, setPressed] = useState(false)

  // Does an event match the key we're watching?
  const match = event => key.toLowerCase() == event.key.toLowerCase()

  // Event handlers
  const onDown = event => {
    if (match(event)) setPressed(true)
  }

  const onUp = event => {
    if (match(event)) setPressed(false)
  }

  // Bind and unbind events
  useEffect(() => {
    window.addEventListener("keydown", onDown)
    window.addEventListener("keyup", onUp)
    return () => {
      window.removeEventListener("keydown", onDown)
      window.removeEventListener("keyup", onUp)
    }
  }, [key])

  return pressed
}

const Timeline = () => {
  const [isFigureActive, setFigureActive] = useState(null)
  const [step, setStep] = useState(0)
  const timelineRef = useRef()
  const [progress, setProgress] = useState(0)
  const [modalContent, setModal] = useState(false)
  const [isAngolite, setAngolite] = useState(false)

  /*function setStepOnVisibility() {
    TIMELINE.forEach((_, index) => {
      onVisibilityChange(`step-${index}`, function() {
        setStep(index)
      })()
    })
  }*/

  const keyToStep = e => {
    console.log(step)
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

  const isLastStep = step < TIMELINE.length - 1

  return (
    <>
      <Menu theme="light" />
      <article className="timeline" ref={timelineRef}>
        {null /*<TimelineTitle setModal={setModal} />*/}
        {TIMELINE.map((timelineStep, i) => {
          if (!timelineStep.paragraphs) return null
          const hasImage = timelineStep.images.length

          return (
            <>
              <div className="timeline-step-pad" data-step={`step-${i}`} />
              <div className="timeline-step-wrap">
                {step === i && (
                  <div key={`timeline-step-${i}`} className="timeline-step">
                    <div className="step-content">
                      <h3 className="year-label">{timelineStep.year}</h3>
                      <h2>{timelineStep.title}</h2>
                      <div className={`step-${i} step-columns`}>
                        <Paragraphs
                          paragraphs={timelineStep.paragraphs}
                          setModal={setModal}
                        />
                      </div>
                    </div>
                    {hasImage && (
                      <>
                        <div style={{ width: "800px", height: "100vh" }}></div>
                        <TimelineFigure
                          step={i}
                          progress={progress}
                          caption={timelineStep.caption}
                          images={timelineStep.images}
                          setFigureActive={setFigureActive}
                          setAngolite={setAngolite}
                        />
                        <div style={{ width: "640px", height: "100vh" }} />
                      </>
                    )}
                    {!hasImage && (
                      <div style={{ width: "640px", height: "300vh" }}></div>
                    )}
                  </div>
                )}
              </div>
            </>
          )
        })}
        {isAngolite && (
          <TimelineAngolite
            onClose={() => {
              setAngolite(false)
            }}
          />
        )}

        {isFigureActive && (
          <TimelineFigureFocus
            setFigureActive={setFigureActive}
            image={TIMELINE[step].image}
          />
        )}

        <TimelineSteps
          step={step}
          onGoToStep={s => {
            setStep(s)
          }}
        />
        {isLastStep && (
          <div
            className="scroll"
            onClick={() => {
              setStep(step + 1)
            }}
          >
            <Caret animate={true} color={"black"} />
          </div>
        )}

        {modalContent && (
          <TimelineModal setModal={setModal} content={modalContent} />
        )}
      </article>
    </>
  )
}

export default Timeline
