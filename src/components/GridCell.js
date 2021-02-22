import React, { useState } from "react"
import { navigate } from "gatsby"
import { useInView } from "react-intersection-observer"
import { useMediaQuery } from "react-responsive"

import GridCellBackground from "./GridCellBackground"
import Play from "./Symbols/Play"

import "./GridCell.css"

import { getNameUri } from "../utils/index.js"

const videosBackground = {
  "Alvin Catchings": "504668722",
  "Arthur Carter": "508705327",
  "Archie Tyner": "508705053",
  "Anthony Hingle": "508704922",
  "Darnell Craft": "508706478",
  "Darwin Willie": "508706826",
  "Daryl Waters": "508706916",
  "David Chenevert": "508707348",
  "Donahue Smith": "508707599",
  "Edbert Simmons": "508707735",
  "Frank Green": "508708389",
  "Gordon Newman": "508708572",
  "Hannibal Stanfield": "508708762",
  "Hayward Jones": "508709415",
  "Bernell Juluke": "508710233",
  "Jack Segura": "508723795",
  "Jarred Lanclow": "508723981",
  "Jeffrer Hillburn": "508724273",
  "Jimmy Robinson": "508724877",
  "Jeffrey Nelson": "508725427",
  "Jerome Derricks": "508731944",
  "Kenneth Woodburn": "508734399",
  "Nadaedrick Campbell": "508737335",
  "Kauntau Reeder": "508739814",
  "Kendrick Fisher": "508746564",
  "Lawson Strickland": "505848783",
  "Patrick Johnson": "505849026",
  "Patrick Lucien": "505851302",
  "Raymond Flank": "505851528",
  "Sammie Robinson": "505853849",
  "Terrence Guy": "505856192",
  "Terry Pierce": "505858769",
  "Terry West": "505861255",
  "Theortric Givens": "505863367",
  "Vashon Kelly": "505863627",
  "Walter Goodwin": "505863920",
  "Walter Reed": "505866295",
}
Object.entries(videosBackground).forEach(
  ([name, id]) =>
    (videosBackground[
      name
    ] = `https://player.vimeo.com/video/${id}?background=1`)
)

const getColor = hex => {
  if (hex.slice(0, 1) === "#") {
    return `clr-${hex.slice(1)}`
  }
}

const GridCell = ({
  image,
  profile_picture,
  quote,
  fullName,
  color,
  video_link,
}) => {
  const [isHover, setHover] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.5,
  })
  const profileUri = getNameUri(fullName)

  if (!image) {
    return null
  }

  const isHoverOrInView =
    (isHover && videosBackground[fullName]) ||
    (isTabletOrMobile && inView && videosBackground[fullName])

  return (
    <div
      className={`grid-cell ${
        isHover || (isTabletOrMobile && inView) ? "hovered" : ""
      }`}
      ref={ref}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      onClick={() => {
        video_link && video_link.url && navigate(`/visiting-room/${profileUri}`)
      }}
    >
      {image && <GridCellBackground isHover={isHoverOrInView} image={image} />}
      {isHoverOrInView && (
        <div
          className={`responsive-iframe-container ${(isHover ||
            (isTabletOrMobile && inView)) &&
            "visible"}`}
        >
          <iframe
            title={fullName}
            className="responsive-iframe"
            src={videosBackground[fullName]}
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      )}
      <div className="cell-hover-layer"></div>
      {quote && (
        <div className="cell-hover-quote">
          {video_link && video_link.url ? (
            <>
              <div />
              {
                null /*<div className="play-wrap">
                  <Play size="large" />
                </div>*/
              }
            </>
          ) : (
            <p style={{ opacity: 0.8 }}>Profile not available yet.</p>
          )}
          <div className={`quote ${getColor(color)}`}>
            <div className="word-wrapper">
              <div className="word">"</div>
            </div>
            {quote.split(" ").map((word, i) => (
              <div className="word-wrapper" key={`word-${i}`}>
                <div
                  className="word"
                  style={{
                    // TODO: Reenable if we want blur fade in
                    // animationDelay: 0.2 + Math.random() * 1 + "s",
                    marginRight: "6px",
                  }}
                >
                  {word}
                </div>
              </div>
            ))}
            <div className="word-wrapper">
              <div className="word">"</div>
            </div>
          </div>
        </div>
      )}
      <h3 className="name-tag border-animation">
        <div
          class={`svg-wrapper ${isHover ? "hovered" : ""}
          ${isTabletOrMobile && inView ? "static-hovered" : ""}
          `}
        >
          <svg height="40" width="210" xmlns="http://www.w3.org/2000/svg">
            <rect
              className="shape"
              height="40"
              width="210"
              stroke={`var(--${getColor(color)}`}
            />
            <foreignObject className="node" x="0" y="0" width="210" height="40">
              <div className="name-wrap">
                {video_link && video_link.url && (
                  <div className="name-play">
                    <Play color={isHover ? color : null} />
                  </div>
                )}
                <div
                  className="text"
                  style={
                    isHover
                      ? {
                          color: `var(--${getColor(color)}`,
                        }
                      : {}
                  }
                >
                  {fullName}
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </h3>
    </div>
  )
}

export default GridCell
