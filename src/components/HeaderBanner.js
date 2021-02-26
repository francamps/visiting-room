import React from "react"
import { Link } from "gatsby"

import "./HeaderBanner.css"

const VisitingRoomBanner = ({ setShowBanner }) => {
  return (
    <>
      <span>{`The Visiting Room invites you to sit with people serving 
life without parole to hear them tell some of their own stories, in their own words. 
These short videos are drawn from longer interviews, which are available in the `}</span>
      <Link to="/archive">Full Archive</Link>
      <span>.</span>
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <div className="link-wrap">
          <button
            onClick={() => {
              window.localStorage.setItem("showBanner__VISITING-ROOM", "false")
              setShowBanner(false)
            }}
            className="hover-link"
          >
            Ok
          </button>
        </div>
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
      <span className="fadeinfast">
        {`For more information about the project, see our `}
      </span>
      <Link to="/about">About</Link>
      <span>.</span>
      <div className="link-wrap">
        <button
          onClick={() => {
            window.localStorage.setItem("showBanner__ARCHIVE", "false")
            setShowBanner(false)
          }}
          className="hover-link"
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
      <span>{`Louisiana sentences more people to life without parole per capita 
      than any other state in the U.S. Below is a history of the sentence 
      drawn largely from research by The Angolite, an award-winning 
      magazine edited and published by people serving time at Angola.`}</span>
      <br />
      <span>{`This short animation about life without parole in Louisiana 
      includes first-hand narration from Terry Pierce, who is currently 
      incarcerated at Angola serving a sentence of life without parole. 
      The video explains how the punishment has changed over time and why such a 
      high number of people who are incarcerated in Louisiana is serving this permanent sentence.`}</span>
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <div className="link-wrap">
          <button
            onClick={() => {
              window.localStorage.setItem("showBanner__TIMELINE", "false")
              setShowBanner(false)
            }}
            className="hover-link"
          >
            Ok
          </button>
        </div>
      </div>
    </>
  )
}

const HeaderBanner = ({ banner, isShow, setShowBanner }) => {
  switch (banner) {
    case "VISITING_ROOM":
      return (
        <div className={`header-banner ${isShow ? "" : "fadeout"}`}>
          <div className="header-entry-text">
            <VisitingRoomBanner setShowBanner={setShowBanner} />
          </div>
        </div>
      )
    case "ARCHIVE":
      return (
        <div className={`header-banner ${isShow ? "" : "fadeout"}`}>
          <div className="header-entry-text">
            <ArchiveBanner setShowBanner={setShowBanner} />
          </div>
        </div>
      )
    case "TIMELINE":
      return (
        <div className={`header-banner ${isShow ? "" : "fadeout"}`}>
          <div className="header-entry-text">
            <TimelineBanner setShowBanner={setShowBanner} />
          </div>
        </div>
      )
  }
  return null
}

export default HeaderBanner