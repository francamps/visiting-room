import React from "react"

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
          <p>
            {`The Visiting Room is a selection of short testimonies of 
            interviews shot at Angola Louisiana State Penitentiary between 2017 and 2018.`}
          </p>
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
