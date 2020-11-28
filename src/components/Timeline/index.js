import React, { useEffect, useState, useRef } from "react"
import { Link } from "gatsby"

import Header from "../Header"
import TimelineModal from "./TimelineModal"
import TimelineFigureFocus from "./TimelineFigureFocus"
import TimelineStepCopy from "./TimelineStepCopy"

import { TIMELINE } from "../../content/timeline"

import "./Timeline.css"
import "./TimelineOnePager.css"

const TimelineOnePager = props => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  const [isFigureActive, setFigureActive] = useState(null)
  const [step] = useState(params.get("chapter") || 0)
  const [headerBreadCrumb, setHeaderBreadcrump] = useState("")
  const timelineRef = useRef()
  const [modalContent, setModal] = useState(false)

  const [fadeout, setFadeOut] = useState(false)

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
          theme="light"
          title={`A History of Life Without Parole ${
            headerBreadCrumb ? "/ " + headerBreadCrumb : ""
          }`}
        />
        <article className="timeline" ref={timelineRef}>
          <div
            className="timeline-frame"
            style={{
              position: "relative",
              background: "var(--clr-off-white)",
            }}
          >
            {TIMELINE.map(
              (timelineStep, stepIdx) =>
                timelineStep.sections && (
                  <TimelineStepCopy
                    timelineStep={timelineStep}
                    stepIdx={stepIdx}
                    setModal={setModal}
                    setHeaderBreadcrump={setHeaderBreadcrump}
                  />
                )
            )}

            <div className="footer">
              <div className="link-wrap">
                <Link
                  to="/visiting-room"
                  className="hover-link"
                  style={{ color: "var(--clr-black)" }}
                >
                  Enter the Visiting Room
                </Link>
              </div>
              <div
                className="link-wrap"
                style={{
                  marginBottom: 0,
                  paddingBottom: "20px",
                }}
              >
                <Link
                  to="/archive"
                  className="hover-link"
                  style={{ color: "var(--clr-black)" }}
                >
                  See the full archive
                </Link>
              </div>
            </div>
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

export default TimelineOnePager
