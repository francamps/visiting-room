import React from "react"
import Img from "gatsby-image"

import video from "../images/ArthurCarter_8s.mp4"

const GridImage = ({ image, profile_picture, isHover, alt }) => {
  if (!image) {
    return null
  }

  return (
    <div className="cell-background">
      {isHover && (
        <div className="gridimage-bg">
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

      <div
        style={{
          opacity: isHover ? 0 : 1,
          transitionProperty: "opacity",
          transitionDelay: "0.4s",
          transitionDuration: "2s",
        }}
      >
        <Img
          alt={alt}
          fluid={image.node.childImageSharp.fluid}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  )
}

export default GridImage
