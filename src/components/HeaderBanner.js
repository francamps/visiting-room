import React from "react"
import { Link } from "gatsby"
import { useInView } from "react-intersection-observer"

import Foreword from "./Timeline/Foreword.js"

import "./HeaderBanner.css"
import { handleKeyUp } from "../utils"

const VisitingRoomBanner = ({ setShowBanner }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.1,
  })

  return (
    <>
      <div
        className="vr-banner"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="" style={{ flex: 1 }}>
          <span>{`The Visiting Room invites you to sit with people serving 
life without parole to hear them tell some of their own stories, in their own words.`}</span>
          <br />
          <br />
          <span>{`These short videos are drawn from longer interviews, which are available in the `}</span>
          <Link to="/archive">Archive</Link>
          <span>.</span>
        </div>
        <div ref={ref} className="intro-banner">
          {inView && <Foreword inView={true} />}
        </div>
      </div>

      <div className="button-wrap">
        <button
          className="secondary"
          onClick={() => {
            setShowBanner(false)
          }}
          onKeyUp={ev => {
            ev.stopPropagation()
            handleKeyUp(ev, () => {
              setShowBanner(false)
            })
          }}
        >
          Ok
        </button>
      </div>
    </>
  )
}

const ArchiveBanner = ({ setShowBanner }) => {
  return (
    <>
      <span>
        This collection includes full-length interviews with 110 people who are
        serving life without the possibility of parole at the Louisiana State
        Penitentiary, Angola.
      </span>
      <br />
      <br />
      <span className="fadeinfast">
        {`For more information about the project, see `}
      </span>
      <Link to="/about">About</Link>
      <span>.</span>
      <div className="button-wrap">
        <button
          onClick={() => {
            setShowBanner(false)
          }}
          onKeyUp={ev => {
            ev.stopPropagation()
            handleKeyUp(ev, () => {
              setShowBanner(false)
            })
          }}
        >
          Ok
        </button>
      </div>
    </>
  )
}

const TimelineBanner = ({ setShowBanner }) => {
  return (
    <>
      <span>{`Louisiana sentences more people to life without parole 
      per capita than any other state in the U.S. Below is a written history 
      of life sentencing in Louisiana, 
      which was drawn largely from research by The Angolite.
      `}</span>
      <div className="button-wrap">
        <button
          className="secondary"
          onClick={() => {
            setShowBanner(false)
          }}
          onKeyUp={ev => {
            ev.stopPropagation()
            handleKeyUp(ev, () => {
              setShowBanner(false)
            })
          }}
        >
          Ok
        </button>
      </div>
    </>
  )
}

const HeaderBanner = ({ banner, isShow, setShowBanner }) => {
  switch (banner) {
    case "VISITING-ROOM":
      return (
        <div className={`header-banner ${isShow ? "fadeinfast" : "fadeout"}`}>
          <div className="header-entry-text auto">
            <VisitingRoomBanner setShowBanner={setShowBanner} />
          </div>
        </div>
      )
    case "ARCHIVE":
      return (
        <div className={`header-banner ${isShow ? "fadeinfast" : "fadeout"}`}>
          <div className="header-entry-text">
            <ArchiveBanner setShowBanner={setShowBanner} />
          </div>
        </div>
      )
    case "TIMELINE":
      return (
        <div className={`header-banner ${isShow ? "fadeinfast" : "fadeout"}`}>
          <div className="header-entry-text">
            <TimelineBanner setShowBanner={setShowBanner} />
          </div>
        </div>
      )
    default:
      return null
  }
}

export default HeaderBanner
