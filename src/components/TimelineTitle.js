import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import TimelineLede from "./TimelineLede"

const TimelineTitle = props => (
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
        return n.node.relativePath.includes("angolabg.jpg")
      })

      if (!image) {
        return null
      }

      //const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
      return (
        <div className="timeline-title timeline-copy">
          <div className="timeline-step" style={{ height: "100vh" }}>
            <div className="background">
              <Img
                alt={props.alt}
                fluid={image.node.childImageSharp.fluid}
                style={{ height: "100%" }}
              />
            </div>
            <div className="copy">
              <TimelineLede setModal={props.setModal} />
            </div>
          </div>
        </div>
      )
    }}
  />
)

export default TimelineTitle
