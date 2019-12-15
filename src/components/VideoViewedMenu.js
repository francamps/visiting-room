import React from "react"
import { navigate } from "gatsby"

import "./VideoViewedMenu.css"
import TimeSlider from "./TimeSlider"
import imageSrc from "../images/TEMP/WALTER.jpg"

const VideoViewedMenu = ({ onClickReplay, onClickNext }) => {
  return (
    <>
      <div className="backdrop"></div>
      <div className="menu-up-next">
        <div
          className="up-next-left options"
          style={{ flex: "1" }}
          onClick={onClickReplay}
        >
          <div className="">REPLAY</div>
          <div className="hover"></div>
        </div>
        <div className="up-next-right">
          <div
            className="thumbnail"
            style={{
              background: `url(${imageSrc}) center center`,
              backgroundSize: "cover",
            }}
            onClick={() => {
              navigate("/visiting-room/")
            }}
          >
            <p className="upper-label">Up next:</p>
            <h3 className="actual-label">Walter Goodwin</h3>
            <TimeSlider />
          </div>
          <div className="hover"></div>
        </div>
      </div>
    </>
  )
}

export default VideoViewedMenu
