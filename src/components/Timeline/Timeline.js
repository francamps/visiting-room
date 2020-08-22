import React, { useEffect, useState, useRef } from "react"

import "./Timeline.css"

import Header from "../Header"
import TimelineSteps from "./TimelineSteps"
import TimelineFigureFocus from "./TimelineFigureFocus"
import TimelineModal from "./TimelineModal"
import TimelineStepCopy from "./TimelineStepCopy"
import TimelineFigure from "./TimelineFigure"

import { TIMELINE } from "../../content/timeline"

import ReactFullpage from "@fullpage/react-fullpage"

const pluginWrapper = () => {
  require("../../utils/statics/fullpage.scrollHorizontally.min")
}

const SEL = "custom-section"
const SECTION_SEL = `.${SEL}`

const Timeline = props => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  const [isFigureActive, setFigureActive] = useState(null)
  const [step, setStep] = useState(params.get("chapter") || 0)
  const [slide, setSlide] = useState(0)
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

  const updateParams = step => {
    params.set("chapter", step)
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
  }

  const isLastStep = step >= TIMELINE.length - 1

  return (
    <>
      <>
        <Header theme="light" />
        <article className="timeline" ref={timelineRef}>
          <div className="timeline-frame">
            <ReactFullpage
              debug /* Debug logging */
              // Required when using extensions
              pluginWrapper={pluginWrapper}
              // fullpage options
              licenseKey={"B0F2A48E-AD6940ED-A2E96019-12ADB919"}
              navigation
              navigationPosition="left"
              scrollOverflow={true}
              scrollHorizontally={true}
              scrollHorizontallyKey={"C81D3510-6BB54357-AE889018-E89FDF65"}
              loopHorizontal={false}
              anchors={TIMELINE.map(t => t.title.replace(/ /g, "_"))}
              sectionSelector={SECTION_SEL}
              afterSlideLoad={() => {
                const slides = document.querySelectorAll(
                  ".fp-section.active .slide"
                )
                const currentSlide =
                  slides &&
                  [...slides].findIndex(s => s.classList.contains("active"))
                setSlide(currentSlide)
              }}
              afterLoad={() => {
                const slides = document.querySelectorAll(".fp-section")
                const currentSection =
                  slides &&
                  [...slides].findIndex(s => s.classList.contains("active"))
                setStep(currentSection)
              }}
              after
              sectionsColor={[]}
              render={comp => (
                <ReactFullpage.Wrapper>
                  {TIMELINE.map(
                    (timelineStep, stepIdx) =>
                      timelineStep.sections && (
                        <div className={SEL} key={stepIdx}>
                          {timelineStep.sections.map(section => (
                            <div className={"slide"}>
                              <TimelineStepCopy
                                step={stepIdx}
                                timelineStep={timelineStep}
                                section={section}
                                setModal={setModal}
                                setFigureActive={setFigureActive}
                                isLastStep={isLastStep}
                                setStep={step => {
                                  updateParams(+step)
                                  setStep(+step)
                                }}
                              />
                            </div>
                          ))}
                          {timelineStep.imagePlacement && (
                            <div className="slide">
                              <div className="timeline-step">
                                <div className="step-content">
                                  <div className="step-content-figure">
                                    <TimelineFigure
                                      step={step}
                                      caption={timelineStep.caption}
                                      images={timelineStep.images}
                                      imageStyle={timelineStep.imageStyle}
                                      setFigureActive={setFigureActive}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </ReactFullpage.Wrapper>
              )}
            />
            <TimelineSteps
              slides={TIMELINE[step]}
              slideIdx={slide}
              step={step}
              /*onGoToStep={s => {
                setStep(s)
              }}*/
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
