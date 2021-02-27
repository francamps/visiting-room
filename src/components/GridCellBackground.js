import React from "react"
import Img from "gatsby-image"

const GridCellBackground = ({ isHover, image, oldImage }) => {
  return (
    <div className={`cell-background ${isHover ? "fadeoutslow" : ""}`}>
      <Img
        alt={"TODO: NEEDS AN ALT"}
        fluid={image}
        imgStyle={{
          objectFit: "cover",
        }}
      />
      {oldImage && (
        <Img
          alt={"TODO: NEEDS AN ALT"}
          fluid={oldImage.node.childImageSharp.fluid}
          imgStyle={{
            objectFit: "cover",
          }}
        />
      )}
    </div>
  )
}

export default GridCellBackground
