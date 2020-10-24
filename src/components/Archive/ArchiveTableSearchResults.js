import React, { useState } from "react"
import Img from "gatsby-image"
import { useMediaQuery } from "react-responsive"
import { navigate } from "gatsby"
import get from "lodash/get"

import Loading from "../Loading"
import Play from "../Symbols/Play"

import getProfileProps from "../../utils/getProfileProps"
import { getNameUri, getSeconds } from "../../utils/index.js"

import { videos } from "../../content/archiveRegistry"
import "./ArchiveTable.css"

const USE_PRISMIC = true

const ArchiveTableSearchResults = ({
  profiles,
  images,
  searchResults,
  isSearchLoading,
}) => {
  const [hoveredRow, setHover] = useState(null)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  return (
    <>
      {isSearchLoading && <Loading hideTitle />}

      {!isSearchLoading && (
        <table>
          <thead>
            <tr>
              <th key={`header-full_name`}>Full Name</th>
              <th key={`header-picture`}></th>
              <th key={`header-picture`}>Results</th>
              <th className="play" />
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, profileIdx) => {
              const { image, oldImage, fullName } = getProfileProps(
                profile,
                images,
                USE_PRISMIC
              )

              const thisResults =
                searchResults
                  .filter(d => getNameUri(fullName) === Object.keys(d)[0])
                  .map(d => Object.values(d)[0])[0] || []

              return (
                <tr
                  key={`archive-table-row-${profileIdx}`}
                  onMouseEnter={() => {
                    setHover(profileIdx)
                  }}
                  onMouseLeave={() => {
                    setHover(null)
                  }}
                  className={`open ${
                    hoveredRow === profileIdx ? "hovered" : ""
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
                      {image && image.node && (
                        <Img
                          alt={"TODO: NEEDS AN ALT"}
                          fluid={image.node.childImageSharp.fluid}
                          imgStyle={{
                            objectFit: "cover",
                            visibility: "visible",
                          }}
                        />
                      )}
                      {oldImage && oldImage.node && (
                        <Img
                          alt={"TODO: NEEDS AN ALT"}
                          fluid={oldImage.node.childImageSharp.fluid}
                          imgStyle={{
                            objectFit: "cover",
                            visibility: "visible",
                          }}
                        />
                      )}
                    </div>
                  </td>
                  {videos[fullName] ? (
                    <td className="play">
                      <Play
                        size="medium"
                        color={"white"}
                        onClick={() => {
                          const profileUri = getNameUri(fullName)
                          videos[fullName] && navigate(`/archive/${profileUri}`)
                        }}
                      />
                    </td>
                  ) : (
                    <td className="play">
                      <p>Profile not available yet.</p>
                    </td>
                  )}
                  <td>
                    {thisResults.map((r, i) => {
                      if (i < 2) {
                        return (
                          <p
                            style={{ margin: 0, cursor: "pointer" }}
                            onClick={() => {
                              const profileUri = getNameUri(fullName)

                              navigate(
                                `/archive/${profileUri}?s=${getSeconds(r.time)}`
                              )
                            }}
                          >
                            {r.content.substring(0, 60) + "..."}
                          </p>
                        )
                      } else if (i === 2 && thisResults.length > 2) {
                        return (
                          <p style={{ margin: 0, cursor: "pointer" }}>
                            {"More results"}
                          </p>
                        )
                      } else {
                        return false
                      }
                    })}
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
