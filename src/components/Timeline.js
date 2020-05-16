import React, { useEffect, useState, useRef } from "react"
import "./Timeline.css"

import Menu from "./Menu"
import Paragraphs from "./Paragraphs"
import TimelineFigure from "./TimelineFigure"
import TimelineSteps from "./TimelineSteps"
import TimelineFigureFocus from "./TimelineFigureFocus"
import TimelineModal from "./TimelineModal"

//import TimelineAngolite from "./TimelineAngolite"
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

/*function useKey(key) {
  // Keep track of key state
  const [pressed, setPressed] = useState(false)

  // Does an event match the key we're watching?
  const match = event => key.toLowerCase() === event.key.toLowerCase()

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
}*/

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

  const timelineStep = TIMELINE[step]
  const hasImage = timelineStep.images.length

  return (
    <>
      <Menu />
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
                  <div className="step-content-static">
                    <h3 className="year-label">{timelineStep.year}</h3>
                    <div className="step-copy">
                      <h2>{timelineStep.title}</h2>
                      <div className={`step-${step} step-columns`}>
                        <Paragraphs
                          paragraphs={timelineStep.paragraphs}
                          setModal={setModal}
                        />
                      </div>
                    </div>
                  </div>
                  {hasImage && (
                    <div className="step-content-snap">
                      <TimelineFigure
                        step={step}
                        progress={progress}
                        caption={timelineStep.caption}
                        images={timelineStep.images}
                        imageStyle={timelineStep.imageStyle}
                        setFigureActive={setFigureActive}
                        setAngolite={setAngolite}
                      />
                    </div>
                  )}
                  {
                    null /*hasImage && (
                        <>
                          <div
                            style={{ width: "800px", height: "100vh" }}
                          ></div>
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
                      )*/
                  }
                </div>
              </div>
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
            <Caret animate={true} color={"var(--clr-primary)"} />
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
