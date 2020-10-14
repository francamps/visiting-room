import React, { useState, useEffect } from "react"

import Loading from "../Loading"

import "./VisitingRoomBanner.css"

const VisitingRoomBanner = ({ isShow, onSearchTyping }) => {
  const [openSearch, setOpenSearch] = useState(false)

  const [isHidden, setHidden] = useState(false)

  useEffect(() => {
    if (!isShow) {
      let timer = setTimeout(() => {
        setHidden(true)
      }, 1200)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isShow])

  return (
    <>
      <div
        className={`visiting-room-banner ${isShow ? "" : "fadeout"}  ${
          isHidden ? "hidden" : ""
        }`}
      >
        <div className="visiting-room-entry-text">
          {
            null /*<p>
            All interviews were filmed at the Louisiana State Penitentiary,
            Angola.
          </p>*/
          }
          <Loading />
        </div>
      </div>
    </>
  )
}

export default VisitingRoomBanner
