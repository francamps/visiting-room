import React, { useState } from "react"
import { useInView } from "react-intersection-observer"
import { navigate } from "gatsby"
import Img from "gatsby-image"

import Years from "../charts/Years"
import Play from "../Symbols/Play"

import { videos } from "../../content/archiveRegistry"
import getProfileProps from "../../utils/getProfileProps"

const USE_PRISMIC = true

const ArchiveTableRow = ({ profile, profileIdx }) => {
  const [isHover, setHover] = useState(false)

  const [ref, inView, entry] = useInView({
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
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      ref={ref}
      className={`${isHover ? "hovered" : ""} isCompact`}
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
        <p className="full-name">{fullName}</p>
      </td>
      <td>
        <div className="fields">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridRowGap: "8px",
              width: "100%",
            }}
          >
            {deceased_date && (
              <>
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--font-xsmall)",
                    height: "20px",
                  }}
                >
                  {"Deceased on:"}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--font-xsmall)",
                    height: "20px",
                  }}
                >
                  {deceased_date}
                </p>
              </>
            )}
            <p>{"Age at offense (year)"}</p>
            <p>{`${age_at_offense} (${date_of_offense})`}</p>
            <p>{"Current age"}</p>
            <p>{current_age}</p>
            <p>{"Years incarcerated"}</p>
            <p>
              <b style={{ color: "var(--clr-primary)" }}>
                {current_age - age_at_offense}
              </b>
            </p>
          </div>
          {inView && (
            <Years
              color={"white"}
              incarcerated={age_at_offense}
              current={current_age}
              deceased_date={deceased_date}
            />
          )}
        </div>
      </td>
      {videos[fullName] ? (
        <td className="play" style={{ textAlign: "center" }}>
          <Play
            size="medium"
            color={"white"}
            onClick={() => {
              const profileUri = fullName.toLowerCase().replace(/ /g, "_")
              videos[fullName] && navigate(`/archive/${profileUri}`)
            }}
          />
        </td>
      ) : (
        <td className="play">
          <p>N/A</p>
        </td>
      )}
    </tr>
  )
}

export default ArchiveTableRow
