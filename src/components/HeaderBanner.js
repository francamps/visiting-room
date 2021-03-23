import React from "react"
import { Link } from "gatsby"

import Play from "./Symbols/Play.js"
import "./HeaderBanner.css"
import vrp from "../images/vrp.png"

const VisitingRoomBanner = ({ setShowBanner }) => {
  return (
    <>
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "row",
          width: "calc(100% - 160px)",
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
          <div
            className="bg"
            style={{
              backgroundImage: `url(${vrp})`,
            }}
          ></div>
          <div className="labels">
            <p style={{ margin: 0, fontSize: "var(--font-small)" }}>
              By Terry West
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: "EB Garamond",
                fontSize: "var(--font-copy)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Play size="normal" />
              Introduction
            </p>
          </div>
        </div>
      </div>

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
      Below the video is a written history of life in Louisiana, 
      which was drawn largely from research by The Angolite, 
      an award-winning magazine that is edited and published by people serving time at Angola.
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
