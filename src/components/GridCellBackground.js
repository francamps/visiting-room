import React from "react"
import Img from "gatsby-image"
import { get as getValue } from "lodash"

const GridCellBackground = ({ isHover, image, oldImage, profile_picture }) => {
  return (
    <div className={`cell-background ${isHover ? "fadeout" : "fadein"}`}>
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
