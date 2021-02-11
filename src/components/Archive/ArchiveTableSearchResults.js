import React, { useState } from "react"
import Img from "gatsby-image"
import { useMediaQuery } from "react-responsive"
import { navigate } from "gatsby"

import Loading from "../Loading"

import getProfileProps from "../../utils/getProfileProps"
import { getNameUri, getSeconds } from "../../utils/index.js"

import "./ArchiveTable.css"

const USE_PRISMIC = true

const ArchiveTableSearchResults = ({
  profiles,
  images,
  searchResults,
  isSearchLoading,
}) => {
  const [hoveredRow, setHover] = useState(null)
  const [openRow, setOpenRow] = useState(null)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  return (
    <>
      {isSearchLoading && <Loading />}

      {!isSearchLoading && (
        <table className="search-results">
          <thead>
            <tr>
              <th key={`header-full_name`}>Full Name</th>
              <th key={`header-picture`}></th>
              <th key={`header-results`}>Results</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, profileIdx) => {
              const { image, oldImage, fullName } = getProfileProps(
                profile,
                USE_PRISMIC
              )
              const profileUri = getNameUri(fullName)

              const thisResults =
                searchResults
                  .filter(d => getNameUri(fullName) === Object.keys(d)[0])
                  .map(d => Object.values(d)[0])[0] || []

              const isOpen = openRow === profileIdx

              return (
                <tr
                  key={`archive-table-row-${profileIdx}`}
                  onMouseEnter={() => {
                    setHover(profileIdx)
                  }}
                  onMouseLeave={() => {
                    setHover(null)
                  }}
                  className={`${hoveredRow === profileIdx ? "hovered" : ""}  ${
                    isOpen ? "open" : ""
                  }`}
                >
                  <td>{fullName}</td>
                  <td style={{ display: "block" }}>
                    <div
                      style={{
                        position: "relative",
                        height: "100%",
                      }}
                    >
                      {image && (
                        <Img
                          alt={"TODO: NEEDS AN ALT"}
                          fluid={image}
                          imgStyle={{
                            objectFit: "cover",
                            visibility: "visible",
                          }}
                        />
                      )}
                      {oldImage && (
                        <Img
                          alt={"TODO: NEEDS AN ALT"}
                          fluid={oldImage}
                          imgStyle={{
                            objectFit: "cover",
                            visibility: "visible",
                          }}
                        />
                      )}
                    </div>
                  </td>
                  <td className="result-quotes">
                    <h6 style={{ margin: 0, lineHeight: "20px" }}>
                      {thisResults.length + " results"}
                    </h6>
                    {thisResults.map((r, i) => {
                      if (i < 2) {
                        return (
                          <p
                            style={{
                              maxHeight: isOpen ? "80px" : "40px",
                            }}
                            onClick={() => {
                              navigate(
                                `/archive/${profileUri}?t=${getSeconds(r.time)}`
                              )
                            }}
                          >
                            <div
                              style={{
                                fontSize: "var(--font-small)",
                                display: "block",
                                margin: 0,
                              }}
                            >
                              <b style={{ marginRight: "8px" }}>{r.speaker}</b>
                              <i style={{ marginRight: "8px" }}>{r.time}</i>
                            </div>
                            {isOpen
                              ? r.content
                              : r.content.substring(0, 120) + "..."}
                          </p>
                        )
                      } else if (isOpen && i > 2) {
                        return (
                          <p
                            style={{
                              maxHeight: isOpen ? "80px" : "40px",
                            }}
                            onClick={() => {
                              navigate(
                                `/archive/${profileUri}?t=${getSeconds(r.time)}`
                              )
                            }}
                          >
                            <b style={{ marginRight: "8px" }}>{r.speaker}</b>
                            <i style={{ marginRight: "8px" }}>{r.time}</i>
                            {isOpen
                              ? r.content
                              : r.content.substring(0, 120) + "..."}
                          </p>
                        )
                      }
                      return null
                    })}
                    <h6
                      style={{ margin: 0, cursor: "pointer" }}
                      onClick={() => {
                        setOpenRow(!isOpen ? profileIdx : null)
                      }}
                      className="see-more"
                    >
                      {"See more >"}
                    </h6>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

export default ArchiveTableSearchResults
