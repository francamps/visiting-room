import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"

import Header from "../Header"
import VisitingRoomBanner from "./VisitingRoomBanner"
import Grid from "../Grid"
import Video from "../Video/Video"
import VisitingRoomIntro from "./Foreword"

import "./VisitingRoom.css"
import { isNull } from "lodash"

const VisitingRoom = ({ loading, profiles = [], images, ...props }) => {
  const [search, setSearch] = useState(null)

  const [fadeout, setFadeOut] = useState(false)
  const [showGrid, setShowGrid] = useState(false)

  const [showIntro, setShowIntro] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("showIntro") === "false"
      ? false
      : true
  )

  useEffect(() => {
    typeof window !== "undefined" &&
      window.localStorage.setItem("showIntro", showIntro)
  }, [showIntro])

  useEffect(() => {
    let timer1
    if (!showIntro) {
      timer1 = setTimeout(() => setFadeOut(true), 3000)
    }

    return () => {
      clearTimeout(timer1)
    }
  }, [showIntro])

  useEffect(() => {
    if (fadeout) {
      let timer2 = setTimeout(() => {
        setShowGrid(true)
        setFadeOut(false)
      }, 1200)

      return () => {
        clearTimeout(timer2)
      }
    }
  }, [fadeout])

  return (
    <div
      className={`visiting-room-wrap container ${showGrid ? "uncovered" : ""}`}
    >
      {!showIntro && (
        <>
          <Header title="The Visiting Room" />
          {!loading && (
            <Grid searchTerm={search} profiles={profiles} images={images} />
          )}
          <VisitingRoomBanner
            fadeout={fadeout}
            showGrid={showGrid}
            onSearchTyping={setSearch}
          />
        </>
      )}
    </div>
  )
}

export default VisitingRoom
