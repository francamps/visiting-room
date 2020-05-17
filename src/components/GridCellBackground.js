import React from "react"
import Img from "gatsby-image"

const GridCellBackground = ({ image }) => {
  return (
    <div className="cell-background">
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
