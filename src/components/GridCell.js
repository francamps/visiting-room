import React, { useState } from "react"
import { navigate } from "gatsby"

import ReactPlayer from "react-player"
import GridCellBackground from "./GridCellBackground"

import "./GridCell.css"
import Play from "./Play"

const videos = [
  "https://vimeo.com/422151517",
  "https://vimeo.com/422151534",
  "https://vimeo.com/422151556",
  "https://vimeo.com/422151586",
  "https://vimeo.com/422151798",
]

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
  setProfile,
  color,
}) => {
  const [isHover, setHover] = useState(false)

  if (!image) {
    return null
  }

  return (
    <div
      className={`grid-cell ${isHover ? "hovered" : ""}`}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      onClick={() => {
        const profileUri = fullName.toLowerCase().replace(/ /g, "_")
        setProfile(profileUri)
        navigate(`/visiting-room/?profile=${profileUri}`)
      }}
    >
      {isHover && (
        <div className="gridimage-video visible">
          <ReactPlayer
            url={`${[videos[Math.floor(Math.random() * videos.length)]]}`}
            className="react-player"
            playing={true}
            width="130%"
            height="130%"
            muted
            loop
          />
        </div>
      )}

      {profile_picture && (
        <GridCellBackground isHover={isHover} image={image} />
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
                    animationDelay: 0.2 + Math.random() * 1 + "s",
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
          <p className="name">{fullName}</p>
          <Play />
        </div>
      )}
      <h3 className="name-tag">{fullName}</h3>
    </div>
  )
}

export default GridCell
