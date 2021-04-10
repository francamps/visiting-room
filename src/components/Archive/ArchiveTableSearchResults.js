import React, { useState } from "react"
import Img from "gatsby-image"
import { navigate } from "gatsby"

import Loading from "../Loading"
import Play from "../Symbols/Play"

import getProfileProps from "../../utils/getProfileProps"
import { getNameUri, getSeconds } from "../../utils/index.js"
import { handleKeyUp } from "../../utils"

import "./ArchiveTableSearchResults.css"

const getProfileResults = (fullName, searchResults) => {
  return (
    searchResults
      .filter(d => getNameUri(fullName) === Object.keys(d)[0])
      .map(d => Object.values(d)[0])[0] || []
  )
}

const ArchiveTableSearchResults = ({
  profiles,
  searchResults,
  searchWords,
  isSearchLoading,
}) => {
  const [hoveredRow, setHover] = useState(null)
  const [openRow, setOpenRow] = useState(null)

  const sortedProfiles = profiles
    .filter(profile => {
      const profileUri = getNameUri(profile.full_name.text)
      return (
        searchResults.findIndex(
          result => Object.keys(result)[0] === profileUri
        ) > -1
      )
    })
    .map(profile => {
      const { image, oldImage, fullName } = getProfileProps(profile)
      const profileResults = getProfileResults(fullName, searchResults)
      const profileUri = getNameUri(fullName)

      return {
        fullName,
        profileUri,
        image,
        oldImage,
        profileResults,
      }
    })
    .sort((a, b) => {
      if (a.profileResults.length > b.profileResults.length) return -1
      if (a.profileResults.length < b.profileResults.length) return 1
      return null
    })

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
            {sortedProfiles.map(
              (
                { fullName, profileUri, image, oldImage, profileResults },
                profileIdx
              ) => {
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
                    className={`${
                      hoveredRow === profileIdx ? "hovered" : ""
                    }  ${isOpen ? "open" : ""}`}
                  >
                    <td>
                      <p className="profile-header">{fullName}</p>
                      <p className="count">
                        {profileResults.length + " results"}
                      </p>
                      <div className="profile-image-wrap">
                        <div className="profile-image">
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
                        {profileResults.map((r, i) => {
                          if (i < 2 || (isOpen && i >= 2)) {
                            return (
                              <p
                                key={`result-${i}`}
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
                                onKeyUp={ev =>
                                  handleKeyUp(ev, () => {
                                    navigate(
                                      `/archive/${profileUri}?t=${getSeconds(
                                        r.time
                                      )}`
                                    )
                                  })
                                }
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
                                    color="var(--clr-dark-grey)"
                                    useCircle
                                    onClick={() => {
                                      navigate(
                                        `/archive/${profileUri}?t=${getSeconds(
                                          r.time
                                        )}`
                                      )
                                    }}
                                  />
                                  <i style={{ margin: "0 8px" }}>{r.time}</i>
                                  <span style={{ marginRight: "8px" }}>
                                    [{r.speaker}]
                                  </span>
                                </div>

                                {isOpen
                                  ? r.content
                                  : r.content.substring(0, 70) + "..."}
                              </p>
                            )
                          }
                          return null
                        })}
                        <p
                          style={{ margin: 0, cursor: "pointer" }}
                          onClick={() => {
                            setOpenRow(!isOpen ? profileIdx : null)
                          }}
                          onKeyUp={ev =>
                            handleKeyUp(ev, () => {
                              setOpenRow(!isOpen ? profileIdx : null)
                            })
                          }
                          className="see-more"
                        >
                          {isOpen ? "See less -" : "See more +"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      )}
    </>
  )
}

export default ArchiveTableSearchResults
