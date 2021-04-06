import React, { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"

import Caret from "../Caret"
import Header from "../Header"
import TimelineModal from "./TimelineModal"
import TimelineStepCopy from "./TimelineStepCopy"
import Paragraphs from "../Paragraphs"

import { TIMELINE } from "../../content/timeline"
import { REFERENCES } from "../../content/references"

import image from "../../images/timeline/1800s.png"

import "./Timeline.css"

const Timeline = () => {
  const [headerBreadCrumb, setHeaderBreadcrump] = useState("")
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
          banner="TIMELINE"
          theme={inView ? null : "light"}
          title={
            inView
              ? ""
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
            <div
              ref={ref}
              className="timeline-cover"
              style={{
                backgroundImage: `url(${image})`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "0px",
                  color: "var(--clr-black)",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    fontSize: "var(--font-subtitle)",
                  }}
                >
                  A History of Life Without Parole
                </h2>
                <div
                  style={{
                    position: "absolute",
                    bottom: "var(--space-around-med)",
                  }}
                >
                  <div
                    style={{
                      transform: "scale(0.7)",
                      transformOrigin: "center center",
                      textAlign: "center",
                    }}
                  >
                    <Caret color="var(--clr-black)" animate />
                  </div>
                  <span
                    style={{
                      fontFamily: "Roboto, Helvetica Neue, Arial, sans-serif",
                      fontSize: "var(--font-small)",
                      marginTop: "0px",
                    }}
                  >
                    SCROLL
                  </span>
                </div>
              </div>
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
                  />
                )
            )}

            <div
              className="footer light link-wrap"
              style={{ justifyContent: "center" }}
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
            {null /*<Footer withRefs withArchive theme="light" />*/}
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
