import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import ChartC from "./charts/ChartC"

import "./TimelineFigure.css"

const USE_PRISMIC = false

const TimelineFigure = ({
  step = 1,
  caption,
  images,
  imageStyle,
  setFigureActive,
  setAngolite,
}) => (
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
      return (
        <>
          {images.map(imageName => {
            if (imageName.indexOf("chart") > -1) {
              return (
                <>
                  <section className="child timeline-figure">
                    <figure>
                      <ChartC />
                    </figure>
                  </section>
                  <section className="child"></section>
                  <section className="child"></section>
                </>
              )
            } else {
              const image = data.images.edges.find(n => {
                return n.node.relativePath.includes(imageName)
              })

              return (
                <section
                  className={`child timeline-figure
                  ${imageStyle === "long" ? "long" : ""}
                `}
                >
                  <figure>
                    <div
                      onClick={() => {
                        setFigureActive(image)
                      }}
                    >
                      <Img
                        alt={"TODO: NEEDS AN ALT"}
                        fluid={image.node.childImageSharp.fluid}
                      />
                      {caption && <p className="caption">{caption}</p>}
                    </div>
                  </figure>
                  {
                    null /*step === 'WHAT' && (
                    <div
                      className="button"
                      onClick={() => {
                        setAngolite(true)
                      }}
                    >
                      See the history of The Angolite >
                    </div>
                    )*/
                  }
                </section>
              )
            }
          })}
        </>
      )
    }}
  />
)

export default TimelineFigure
