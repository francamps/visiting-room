import React, { useState } from "react"
import { useInView } from "react-intersection-observer"
import { navigate } from "gatsby"
import Img from "gatsby-image"

import Years from "../charts/Years"
import Play from "../Symbols/Play"

import { videos } from "../../content/archiveRegistry"
import getProfileProps from "../../utils/getProfileProps"
import { scaleDivergingSymlog } from "d3-scale"

const USE_PRISMIC = true

const ArchiveTableRowLarge = ({ profile, profileIdx }) => {
  const [isHover, setHover] = useState(false)

  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.5,
  })
  const {
    image,
    oldImage,
    fullName,
    date_of_offense,
    age_at_offense,
    current_age,
    deceased_date,
  } = getProfileProps(profile, USE_PRISMIC)

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
      <td>
        <>{date_of_offense}</>
      </td>
      <td>{age_at_offense}</td>
      <td>
        <>
          {current_age}
          {deceased_date && (
            <div
              style={{
                margin: 0,
                height: "20px",
                width: "100%",
                wordBreak: "break-all",
                fontSize: "var(--font-small)",
              }}
            >
              <p style={{ margin: 0, lineHeight: "20px", textAlign: "right" }}>
                Deceased:
              </p>
              <p style={{ margin: 0, lineHeight: "20px", textAlign: "right" }}>
                {deceased_date.getFullYear()}
              </p>
            </div>
          )}
        </>
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
              color={"white"}
              incarcerated={age_at_offense}
              current={current_age}
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
              >{` ${current_age - age_at_offense}`}</span>
            </p>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default ArchiveTableRowLarge
