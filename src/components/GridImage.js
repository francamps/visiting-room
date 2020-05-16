import React, { useState } from "react"
import { navigate } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import video from "../images/ArthurCarter_8s_mute.mp4"

import "./GridImage.css"

const GridImage = ({ image, profile_picture, quote, fullName, setProfile }) => {
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
      {profile_picture && (
        <div className="cell-background">
          <BackgroundImage
            fluid={image.node.childImageSharp.fluid}
            style={{
              width: "100%",
              height: "100%",
              backgroundPosition: "bottom center",
              backgroundRepeat: "repeat-y",
              backgroundSize: "cover",
            }}
          >
            {isHover && (
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
          </BackgroundImage>
        </div>
      )}

      <div className="cell-hover-layer"></div>
      {quote && (
        <div className="cell-hover-quote">
          <p className="quote">"{quote}"</p>
        </div>
      )}
      <h3
        className="name-tag"
        style={{
          letterSpacing: isHover ? "0.03em" : "normal",
        }}
      >
        {fullName}
      </h3>
    </div>
  )
}

export default GridImage
