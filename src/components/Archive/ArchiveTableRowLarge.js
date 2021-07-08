import React, { useState } from "react"
import { useInView } from "react-intersection-observer"
import { navigate } from "gatsby"
import Img from "gatsby-image"

import Years from "../charts/Years"
import Play from "../Symbols/Play"

import { videos } from "../../content/archiveRegistry"
import getProfileProps from "../../utils/getProfileProps"

const ArchiveTableRowLarge = ({ profile, profileIdx }) => {
  const [isHover, setHover] = useState(false)

  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.5,
  })
  const {
    image,
    gist,
    oldImage,
    fullName,
    date_of_offense,
    age_at_offense,
    deceased_date,
    time_served,
    age_at_interview,
  } = getProfileProps(profile)

  return (
    <tr
      key={`archive-table-row-${profileIdx}`}
      onMouseEnter={() => {
        setHover(profileIdx)
      }}
      onMouseLeave={() => {
        setHover(null)
      }}
      ref={ref}
      className={`${isHover ? "hovered" : ""}`}
      onClick={() => {
        const profileUri = fullName.toLowerCase().replace(/ /g, "_")
        videos[fullName] && navigate(`/archive/${profileUri}`)
      }}
    >
      <td style={{ display: "block", position: "relative", padding: 0 }}>
        <div
          style={{
            position: "absolute",
            height: "100%",
            top: "10px",
            bottom: "10px",
            left: "10px",
            right: "10px",
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
        <div className="full-name">
          <Play
            size="normal"
            color={"white"}
            onClick={() => {
              const profileUri = fullName.toLowerCase().replace(/ /g, "_")
              videos[fullName] && navigate(`/archive/${profileUri}`)
            }}
          />
          <p
            style={{
              margin: 0,
              height: "20px",
              lineHeight: "20px",
            }}
          >
            {fullName}
          </p>
        </div>
      </td>
      {/** Hiding for now while sharing */
      false && isHover ? (
        <td
          style={{
            flex: "0 0 466px",
          }}
        >
          <p
            style={{
              wordBreak: "breakWord",
              whiteSpace: "normal",
              textAlign: "left",
              lineHeight: "var(--font-copy)",
              fontSize: "var(--font-normal)",
            }}
          >
            {gist}
          </p>
        </td>
      ) : (
        <>
          <td>
            <>{date_of_offense}</>
          </td>
          <td>{age_at_offense}</td>
          <td>
            <>{age_at_interview}</>
          </td>
          <td>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: isHover ? "space-between" : "flex-end",
                width: "100%",
                alignItems: "center",
              }}
            >
              {inView && (
                <Years
                  color={"black"}
                  incarcerated={age_at_offense}
                  current={age_at_interview}
                  deceased_date={deceased_date}
                />
              )}
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      color: "var(--clr-primary)",
                      whiteSpace: "pre",
                    }}
                  >{` ${time_served}`}</span>
                </p>
              </div>
            </div>
          </td>
        </>
      )}
    </tr>
  )
}

export default ArchiveTableRowLarge
