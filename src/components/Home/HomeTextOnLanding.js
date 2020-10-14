import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import "./HomeTextOnLanding.css"

const HomeTextOnLanding = ({ isShowEnter }) => {
  return (
    <>
      <div className={`text-on-landing ${isShowEnter ? "fadein" : ""}`}>
        <div className={`title ${isShowEnter ? "fadein" : ""}`}>
          <h1
            onClick={() => {
              if (typeof window !== "undefined") {
                if (window.localStorage.getItem("showIntro") === "false") {
                  navigate("/visiting-room")
                } else {
                  navigate("/foreword")
                }
              }
            }}
          >
            the visiting room
          </h1>
        </div>
      </div>
    </>
  )
}

export default HomeTextOnLanding
