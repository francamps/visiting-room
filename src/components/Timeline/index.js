import React, { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"

import Header from "../Header"
import TimelineModal from "./TimelineModal"
import TimelineFigureFocus from "./TimelineFigureFocus"
import TimelineStepCopy from "./TimelineStepCopy"
import Caret from "../Caret"
import Foreword from "./Foreword"
import Footer from "../Footer"

import { TIMELINE } from "../../content/timeline"

import "./Timeline.css"

const Timeline = props => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  const [isFigureActive, setFigureActive] = useState(null)
  const [step] = useState(params.get("chapter") || 0)
  const [headerBreadCrumb, setHeaderBreadcrump] = useState("")
  const [stepInView, setStepInView] = useState(null)
  const timelineRef = useRef()
  const [modalContent, setModal] = useState(false)
  const [fadeout, setFadeOut] = useState(false)

  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.5,
  })

  useEffect(() => {
    let timer1 = setTimeout(() => setFadeOut(true), 60000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  useEffect(() => {
    if (fadeout) {
      let timer2 = setTimeout(() => {
        setFadeOut(false)
      }, 1200)

      return () => {
        clearTimeout(timer2)
      }
    }
  }, [fadeout])

  return (
    <>
      <>
        <Header
          theme={inView ? null : "light"}
          title={
            inView
              ? "A History of Life Without Parole in Louisiana"
              : `A History of Life Without Parole ${
                  headerBreadCrumb ? "/ " + headerBreadCrumb : ""
                }`
          }
        />
        <article
          className={`timeline ${!inView ? "in-view" : ""}`}
          ref={timelineRef}
        >
          <div className="timeline-frame">
            <div ref={ref} className="timeline-cover">
              <Foreword />
              <Caret />
            </div>
            {TIMELINE.map(
              (timelineStep, stepIdx) =>
                timelineStep.sections && (
                  <TimelineStepCopy
                    key={`timeline-step-copy-${stepIdx}`}
                    timelineStep={timelineStep}
                    stepIdx={stepIdx}
                    setModal={setModal}
                    setHeaderBreadcrump={setHeaderBreadcrump}
                    setStepInView={setStepInView}
                  />
                )
            )}

            <Footer withRefs withArchive theme="light" />
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
