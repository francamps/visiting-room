import React from "react"
import Img from "gatsby-image"

const GridImage = ({ image, alt }) => {
  if (!image) {
    return null
  }

  return (
    <Img
      alt={alt}
      fluid={image.node.childImageSharp.fluid}
      style={{ height: "100%" }}
    />
  )
}

export default GridImage
