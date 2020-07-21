import React from "react"
import Img from "gatsby-image"

const GridCellBackground = ({ isHover, image, opacityOnHover }) => {
  return (
    <div
      className="cell-background"
      style={{
        opacity: isHover ? opacityOnHover || 0 : 1,
        transitionProperty: "opacity",
        transitionDelay: "0.4s",
        transitionDuration: "8s",
      }}
    >
      <Img
        alt={"TODO: NEEDS AN ALT"}
        fluid={image.node.childImageSharp.fluid}
        imgStyle={{
          objectFit: "cover",
        }}
      />
    </div>
  )
}

export default GridCellBackground
