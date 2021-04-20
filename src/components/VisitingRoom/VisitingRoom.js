import React, { useEffect, useState } from "react"

import Grid from "../Grid"
import Header from "../Header"

import "./VisitingRoom.css"

const VisitingRoom = ({ loading, profiles = [], images, ...props }) => {
  const [isShowBanner, setShowBanner] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("showBanner__VISITING-ROOM") === "true"
  )

  const [showSound, setShowSound] = useState(false)

  useEffect(() => {
    let timerSound = setTimeout(() => {
      setShowSound(true)
    }, 2000)

    return () => {
      clearTimeout(timerSound)
    }
  }, [])

  return (
    <div className="visiting-room-wrap container">
      <>
        {!loading && (
          <>
            <Header
              title="The Visiting Room"
              banner="VISITING-ROOM"
              onSetShowBanner={setShowBanner}
            />
            <Grid
              profiles={profiles}
              images={images}
              isLoadBackgrounds={!isShowBanner}
            />
          </>
        )}
      </>
    </div>
  )
}

export default VisitingRoom
