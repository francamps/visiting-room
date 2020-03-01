import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import ChartA from "./charts/ChartA"
import ChartB from "./charts/ChartB"

const images = [
  null,
  "timeline/signed_pardon_focus.png",
  "timeline/laws_of_life_focus.png",
  null,
  "timeline/calvin.png",
  "timeline/placeholder.jpg",
  null,
]

const TimelineFigure = ({ step = 1, caption, setFigureActive }) => (
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
        return n.node.relativePath.includes(images[step])
      })

      if (!image && step !== 2 && step !== 3) {
        return null
      }

      return (
        <figure className={`stickness ${step === 4 ? "static" : ""}`}>
          {step === 2 && (
            <div className="chart-wrap">
              <ChartA />
              <h4 className="title">
                People serving life without parole in Louisiana
              </h4>
            </div>
          )}
          {step === 3 && (
            <div className="chart-wrap">
              <ChartB />
              <h4 className="title">
                State prison commutations in Louisiana by Governor
              </h4>
            </div>
          )}
          {step !== 3 && images[step] && (
            <div
              onClick={() => {
                setFigureActive(images[step])
              }}
            >
              <Img
                alt={"TODO: NEEDS AN ALT"}
                fluid={image.node.childImageSharp.fluid}
              />
              {caption && <p className="caption">{caption}</p>}
            </div>
          )}
        </figure>
      )
    }}
  />
)

export default TimelineFigure
