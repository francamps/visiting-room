import React, { useState } from "react"
import Img from "gatsby-image"
import { useMediaQuery } from "react-responsive"
import { navigate } from "gatsby"

import Loading from "../Loading"
import Play from "../Symbols/Play"
import getProfileProps from "../../utils/getProfileProps"
import { getNameUri, getSeconds } from "../../utils/index.js"

import "./ArchiveTableSearchResults.css"

const USE_PRISMIC = true

const ArchiveTableSearchResults = ({
  profiles,
  images,
  searchResults,
  searchWords,
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
              <th key={`header-full_name`}>{`Results for "${searchWords}"`}</th>
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
                  <td
                    style={{
                      display: "block",
                      position: "relative",
                      padding: 0,
                      display: "grid",
                      gridTemplateColumns: "180px 1fr",
                      gridColumnGap: "10px",
                      gridTemplateRows: "60px 1fr",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "EB Garamond",
                        fontSize: "var(--font-copy)",
                        paddingLeft: "10px",
                      }}
                    >
                      {fullName}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="count"
                    >
                      {thisResults.length + " results"}
                    </p>
                    <div
                      style={{
                        position: "relative",
                        width: "160px",
                        height: "160px",
                        margin: "0 10px",
                        alignSelf: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          height: "auto",
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
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
                    </div>
                    <div className="result-quotes">
                      {thisResults.map((r, i) => {
                        if (i < 2 || (isOpen && i >= 2)) {
                          return (
                            <p
                              style={{
                                maxHeight: isOpen ? "90px" : "50px",
                                marginBottom: "10px",
                              }}
                              className="quote"
                              onClick={() => {
                                navigate(
                                  `/archive/${profileUri}?t=${getSeconds(
                                    r.time
                                  )}`
                                )
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "var(--font-small)",
                                  display: "flex",
                                  alignItems: "center",
                                  margin: 0,
                                }}
                              >
                                <Play
                                  size="normal"
                                  useCircle
                                  onClick={() => {
                                    navigate(
                                      `/archive/${profileUri}?t=${getSeconds(
                                        r.time
                                      )}`
                                    )
                                  }}
                                />
                                <i style={{ marginRight: "8px" }}>{r.time}</i>
                                <b style={{ marginRight: "8px" }}>
                                  {r.speaker}
                                </b>
                              </div>

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
                        {isOpen ? "See less <" : "See more >"}
                      </h6>
                    </div>
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
