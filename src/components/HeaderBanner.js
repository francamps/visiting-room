import React from "react"
import { Link } from "gatsby"
import { useMediaQuery } from "react-responsive"

import Play from "./Symbols/Play.js"
import Foreword from "./Timeline/Foreword.js"

import "./HeaderBanner.css"

import vrp from "../images/vrp.png"

const VisitingRoomBanner = ({ setShowBanner }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  return (
    <>
      <div
        className="vr-banner"
        style={{
          display: "flex",
          flexDirection: isTabletOrMobile ? "column" : "row",
          width: isTabletOrMobile ? "calc(100% - 80px)" : "calc(100% - 160px)",
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
        <div onClick={() => {}} className="intro-banner">
          <Foreword inView={true} />
        </div>
      </div>

      <div className="button-wrap">
        <button
          className="secondary"
          onClick={() => {
            setShowBanner(false)
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
        {`For more information about the project, see our `}
      </span>
      <Link to="/about">About</Link>
      <span>.</span>
      <div className="button-wrap">
        <button
          onClick={() => {
            setShowBanner(false)
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
      per capita than any other state in the U.S. Below is an original 
      animation about the sentence in this state, featuring narration 
      by Terry Pierce, who is currently serving life without parole. 
      The video is a written history of life in Louisiana, 
      which was drawn largely from research by The Angolite.
      `}</span>
      <div className="button-wrap">
        <button
          onClick={() => {
            setShowBanner(false)
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
  }
  return null
}

export default HeaderBanner
