import React, { useEffect, useState } from "react"

import Header from "../Header"
import VisitingRoomBanner from "./VisitingRoomBanner"
import Grid from "../Grid"

import "./VisitingRoom.css"

const VisitingRoom = ({ loading, profiles = [], images, ...props }) => {
  const [search, setSearch] = useState(null)

  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    if (showBanner) {
      let timer = setTimeout(() => {
        setShowBanner(false)
      }, 1200)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [])

  return (
    <div className="visiting-room-wrap container">
      <>
        {!loading && !showBanner && (
          <>
            <Header title="The Visiting Room" />
            <Grid searchTerm={search} profiles={profiles} images={images} />
          </>
        )}
        <VisitingRoomBanner isShow={loading} onSearchTyping={setSearch} />
      </>
    </div>
  )
}

export default VisitingRoom
