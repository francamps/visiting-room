import React, { useState } from "react"
import { navigate } from "gatsby"

import video from "../images/ArthurCarter_8s_mute.mp4"

import GridCellBackground from "./GridCellBackground"

import "./GridCell.css"

const GridCell = ({ image, profile_picture, quote, fullName, setProfile }) => {
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
      {profile_picture && <GridCellBackground image={image} />}
      {false && (
        <div
          className="gridimage-video"
          style={{
            opacity: isHover ? 1 : 0,
            transitionProperty: "opacity",
            transitionDelay: "0.4s",
            transitionDuration: "2s",
          }}
        >
          <video
            loop
            muted
            autoPlay
            poster={profile_picture}
            className="fullscreen-bg__video"
          >
            {null /*<source src={video} type="video/webm">*/}
            <source src={video} type="video/mp4" />
            {null /*<source src={video} type="video/ogg">*/}
          </video>
        </div>
      )}
      <div className="cell-hover-layer"></div>
      {quote && (
        <div className="cell-hover-quote">
          <p className="quote">
            <div className="word-wrapper">
              <div className="word">"</div>
            </div>
            {quote.split(" ").map(word => (
              <div className="word-wrapper">
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
          </p>
          <p className="name">{fullName}</p>
        </div>
      )}
      <h3 className="name-tag">{fullName}</h3>
    </div>
  )
}

export default GridCell
