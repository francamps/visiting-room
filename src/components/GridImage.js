import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

// Note: You can change "images" to whatever you'd like.

const GridImage = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.path)
      })

      if (!image) {
        return null
      }

      //const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
      return (
        <Img
          alt={props.alt}
          fluid={image.node.childImageSharp.fluid}
          style={{ height: "100%" }}
        />
      )
    }}
  />
)

export default GridImage
