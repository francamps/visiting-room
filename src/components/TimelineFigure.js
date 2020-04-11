import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import ChartA from "./charts/ChartA"
import ChartB from "./charts/ChartB"

import "./TimelineFigure.css"

const USE_PRISMIC = false

const TimelineFigure = ({
  step = 1,
  caption,
  images,
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
        <div
          className={`timeline-figure figure-flex
            ${step === 4 || step === 3 ? "figure-wide long" : ""}`}
        >
          <figure className={`stickness ${step === 4 ? "static" : ""}`}>
            {images.map(imageName => {
              if (imageName.indexOf("chart") > -1) {
                if (imageName.split("chart")[1] === "A") return <ChartA />
                if (imageName.split("chart")[1] === "B") return <ChartB />
              } else {
                const image = data.images.edges.find(n => {
                  return n.node.relativePath.includes(imageName)
                })

                return (
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
                )
              }
            })}
          </figure>
          {step === 1 && (
            <div
              className="button"
              onClick={() => {
                setAngolite(true)
              }}
            >
              See the history of The Angolite >
            </div>
          )}
        </div>
      )
    }}
  />
)

export default TimelineFigure
