import React, { useEffect, useState } from "react"

import Grid from "../Grid"
import Header from "../Header"
import MenuButton from "../MenuButton"
import IconSound from "../Symbols/Sound"
import { handleKeyUp } from "../../utils"

import "./VisitingRoom.css"

const VisitingRoom = ({ loading, profiles = [], images, ...props }) => {
  const [isShowBanner, setShowBanner] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("showBanner__VISITING-ROOM") === "true"
  )

  const [isSoundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    let timerSound = setTimeout(() => {
      setSoundEnabled(true)
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
              actions={
                <MenuButton
                  onClick={() => {
                    setSoundEnabled(!isSoundEnabled)
                  }}
                  onKeyUp={ev =>
                    handleKeyUp(ev, () => {
                      setSoundEnabled(!isSoundEnabled)
                    })
                  }
                  buttonContent={<IconSound />}
                  tooltipContent={
                    <div style={{ width: isSoundEnabled ? "90px" : "85px" }}>
                      {isSoundEnabled ? "Disable sound" : "Enable sound"}
                    </div>
                  }
                />
              }
            />
            <Grid
              profiles={profiles}
              images={images}
              isLoadBackgrounds={!isShowBanner}
              isSoundEnabled={isSoundEnabled}
            />
          </>
        )}
      </>
    </div>
  )
}

export default VisitingRoom
