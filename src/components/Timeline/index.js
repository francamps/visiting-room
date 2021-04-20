import React, { useEffect, useState, useRef } from "react"

import Header from "../Header"
import TimelineModal from "./TimelineModal"
import TimelineCover from "./TimelineCover"
import TimelineStepCopy from "./TimelineStepCopy"
import Paragraphs from "../Paragraphs"

import { TIMELINE } from "../../content/timeline"
import { REFERENCES } from "../../content/references"

import "./Timeline.css"

const Timeline = () => {
  const [headerBreadCrumb, setHeaderBreadcrump] = useState("")
  const timelineRef = useRef()
  const [modalContent, setModal] = useState(false)
  const [fadeout, setFadeOut] = useState(false)
  const [inView, setInView] = useState(false)

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
          banner="TIMELINE"
          theme="light"
          title={
            inView
              ? ""
              : `A History of Life Without Parole ${
                  headerBreadCrumb ? "/ " + headerBreadCrumb : ""
                }`
          }
        />
        <article className="timeline" ref={timelineRef}>
          <div className="timeline-frame">
            <TimelineCover setInView={setInView} />
            {TIMELINE.map(
              (timelineStep, stepIdx) =>
                timelineStep.sections && (
                  <TimelineStepCopy
                    key={`timeline-step-copy-${stepIdx}`}
                    timelineStep={timelineStep}
                    stepIdx={stepIdx}
                    setModal={setModal}
                    setHeaderBreadcrump={setHeaderBreadcrump}
                  />
                )
            )}

            <div
              className="footer light link-wrap"
              style={{
                justifyContent: "center",
                paddingBottom: "var(--space-around-med)",
              }}
            >
              <button
                onClick={() =>
                  setModal({
                    stickOnClick: true,
                    styling: {
                      alignItems: "flex-start",
                      overflow: "auto",
                      paddingTop: "20px",
                    },
                    content: (
                      <>
                        <h2 style={{ marginBottom: "20px" }}>References</h2>
                        <Paragraphs paragraphs={REFERENCES} theme="light" />
                      </>
                    ),
                  })
                }
              >
                See references
              </button>
            </div>
          </div>

          {modalContent && (
            <TimelineModal
              setModal={setModal}
              content={modalContent.content}
              styling={modalContent.styling}
              stickOnClick={modalContent.stickOnClick}
            />
          )}
        </article>
      </>
    </>
  )
}

export default Timeline
