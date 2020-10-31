import React from "react"
import Img from "gatsby-image"

const ArchiveGridCellBackground = ({
  isHover,
  image,
  oldImage,
  opacityOnHover,
}) => {
  return (
    <div className={`cell-background ${isHover ? "hovered" : ""}`}>
      <Img
        alt={"TODO: NEEDS AN ALT"}
        fluid={image.node.childImageSharp.fluid}
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

export default ArchiveGridCellBackground