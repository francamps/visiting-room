import React, { useState } from "react"
import { useInView } from "react-intersection-observer"
import { navigate } from "gatsby"
import Img from "gatsby-image"

import Years from "../charts/Years"
import Play from "../Symbols/Play"

import { videos } from "../../content/archiveRegistry"
import getProfileProps from "../../utils/getProfileProps"

const ArchiveTableRow = ({ profile, profileIdx }) => {
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
    deceased_date,
    time_served,
    age_at_interview,
  } = getProfileProps(profile)

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
            height: "calc(100% - 20px)",
            top: "10px",
            bottom: "10px",
            left: "10px",
            right: "10px",
          }}
        >
          {image && (
            <Img
              alt={"Picture at the time of the interview"}
              fluid={image}
              imgStyle={{
                objectFit: "cover",
                visibility: "visible",
              }}
            />
          )}
          {oldImage && (
            <Img
              alt={"Picture at the time of detention."}
              fluid={oldImage}
              imgStyle={{
                objectFit: "contain !important",
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
          <p>{fullName}</p>
        </div>
      </td>
      <td>
        <div className="fields">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
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
                  {deceased_date.getFullYear()}
                </p>
              </>
            )}
            <p>{"Incarcerated since"}</p>
            <p>{date_of_offense}</p>
            <p>{"Age at offense"}</p>
            <p>{age_at_offense}</p>
            <p>{"Age"}</p>
            <p>{age_at_interview}</p>
            <p>{"Years incarcerated"}</p>
            <p>
              <b style={{ color: "var(--clr-primary)" }}>{time_served}</b>
            </p>
          </div>
          {inView && (
            <Years
              color={"black"}
              incarcerated={age_at_offense}
              current={age_at_interview}
              deceased_date={deceased_date}
            />
          )}
        </div>
      </td>
    </tr>
  )
}

export default ArchiveTableRow
