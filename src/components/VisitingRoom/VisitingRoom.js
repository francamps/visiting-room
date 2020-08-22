import React, { useEffect, useState } from "react"

import Header from "../Header"
import VisitingRoomBanner from "./VisitingRoomBanner"
import Grid from "../Grid"
import Video from "../Video/Video"
import VisitingRoomIntro from "./VisitingRoomIntro"

import "./VisitingRoom.css"

const VisitingRoom = ({ loading, profiles = [], images }) => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )
  const [profileId, setProfile] = useState(params.get("profile"))
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
    let timer1 = setTimeout(() => setFadeOut(true), 3000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

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

  const profile =
    profiles &&
    profiles.find(
      p => p.full_name[0].text.toLowerCase().replace(/ /g, "_") === profileId
    )

  return (
    <div
      className={`visiting-room-wrap container ${showGrid ? "uncovered" : ""}`}
    >
      {!profileId ? (
        <>
          <Header />
          {!loading && (
            <Grid
              searchTerm={search}
              profiles={profiles}
              images={images}
              setProfile={setProfile}
            />
          )}
          <VisitingRoomBanner
            fadeout={fadeout}
            showGrid={showGrid}
            onSearchTyping={setSearch}
          />
        </>
      ) : (
        <Video
          profileId={profileId}
          name={profile && profile.full_name && profile.full_name[0].text}
          color={profile && profile.color}
          onClose={() => setProfile(null)}
        />
      )}
      {showIntro && <VisitingRoomIntro setShowIntro={setShowIntro} />}
    </div>
  )
}

export default VisitingRoom
