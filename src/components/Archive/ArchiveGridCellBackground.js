import React from "react"
import Img from "gatsby-image"

const ArchiveGridCellBackground = ({
  isHover,
  image,
  oldImage,
  opacityOnHover,
}) => {
  if (!image) return null

  return (
    <div className={`cell-background ${isHover ? "hovered" : ""}`}>
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
          fluid={oldImage}
          imgStyle={{
            objectFit: "cover",
          }}
        />
      )}
    </div>
  )
}

export default ArchiveGridCellBackground
