import React, { useState, useRef } from "react"

import ArchiveGridCell from "./ArchiveGridCell"

import sortProfiles from "../utils/sortProfiles"
import useDocumentScroll from "../utils/useDocumentScroll"

import "./ArchiveGrid.css"

const ArchiveGrid = ({
  profiles,
  images,
  sortAsc,
  sortType,
  searchTerm,
  openProfile,
  setOpenProfile,
  setShrunkHeader,
}) => {
  const ref = useRef()
  const MINIMUM_SCROLL = 80
  const TIMEOUT_DELAY = 400

  useDocumentScroll(
    ref.current,
    callbackData => {
      const { previousScrollTop, currentScrollTop } = callbackData
      //      const isScrolledDown = previousScrollTop < currentScrollTop
      const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL

      setTimeout(() => {
        setShrunkHeader(isMinimumScrolled)
      }, TIMEOUT_DELAY)
    },
    [ref.current]
  )

  return (
    <div className="archive-grid" ref={ref}>
      {sortProfiles(profiles.slice(0), sortType, sortAsc)
        .filter(profile => {
          if (searchTerm === null || searchTerm === "") return true
          if (profile["Full Name"].indexOf(searchTerm) > -1) return true
          return false
        })
        .map((profile, profileIdx) => (
          <ArchiveGridCell
            profile={profile}
            profileIdx={profileIdx}
            images={images}
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
          />
        ))}
    </div>
  )
}

export default ArchiveGrid
