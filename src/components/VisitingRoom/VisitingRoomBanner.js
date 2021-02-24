import React from "react"
import { Link } from "gatsby"
import CrossClose from "../CrossClose"

import "./VisitingRoomBanner.css"

const VisitingRoomBanner = ({ isShow, setShowBanner }) => {
  return (
    <>
      <div className={`visiting-room-banner ${isShow ? "" : "fadeout"}`}>
        <div className="visiting-room-entry-text">
          <h3 className="fadeinfast" style={{ margin: 0 }}>
            Visiting Room
          </h3>
          <span>{`The Visiting Room invites you to sit with people serving life without parole to hear them tell some of their own stories, in their own words. 
These short videos are drawn from longer interviews, which are available in the `}</span>
          <Link to="/archive">Full Archive</Link>
          <span>.</span>
        </div>
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
                window.localStorage.setItem("showVRBanner", "false")
                setShowBanner(false)
              }}
              className="hover-link"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default VisitingRoomBanner
