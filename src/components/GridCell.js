import React, { useState } from "react"
import { navigate } from "gatsby"
import ReactPlayer from "react-player"
import { useInView } from "react-intersection-observer"
import { useMediaQuery } from "react-responsive"

import GridCellBackground from "./GridCellBackground"
import Play from "./Symbols/Play"

import "./GridCell.css"

import { videos } from "../content/videoRegistry"
import { getNameUri } from "../utils/index.js"

const videosBackground = {
  "Alvin Catchings": "https://vimeo.com/422151517",
  "Archie Tyner": "https://vimeo.com/422151534",
  "Bernell Juluke": "https://vimeo.com/422151556",
  "Darnell Craft": "https://vimeo.com/422151586",
  "Arthur Carter": "https://vimeo.com/422151798",
}

const getColor = hex => {
  if (hex.slice(0, 1) === "#") {
    return `clr-${hex.slice(1)}`
  }
}

const GridCell = ({ image, profile_picture, quote, fullName, color }) => {
  const [isHover, setHover] = useState(false)
  const [isVideoReady, setVideoReady] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0.5,
  })
  const profileUri = getNameUri(fullName)

  if (!image) {
    return null
  }

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
        setVideoReady(false)
        setHover(false)
      }}
      onClick={() => {
        videos[fullName] && navigate(`/visiting-room/${profileUri}`)
      }}
    >
      {isHover && (
        <div className="gridimage-video visible">
          <ReactPlayer
            url={`${videosBackground[fullName]}`}
            className="react-player"
            playing={true}
            width="130%"
            height="130%"
            muted
            loop
            onReady={() => {
              setVideoReady(true)
            }}
          />
        </div>
      )}

      {profile_picture && (
        <GridCellBackground
          isHover={isHover && isVideoReady}
          image={image}
          profile_picture={profile_picture}
        />
      )}
      <div className="cell-hover-layer"></div>
      {quote && (
        <div className="cell-hover-quote">
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
          {videos[fullName] ? (
            <Play />
          ) : (
            <p style={{ opacity: 0.8 }}>Profile not available yet.</p>
          )}
        </div>
      )}
      <h3 className="name-tag">{fullName}</h3>
    </div>
  )
}

export default GridCell
