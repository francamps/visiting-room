import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import image1 from "../images/TEMP/timeline/image1.png"
import image2 from "../images/TEMP/timeline/image2.png"
//import image3 from "../images/TEMP/timeline/image3.png"
import image4 from "../images/TEMP/timeline/image4.jpg"
//import image5 from "../images/TEMP/timeline/image5.png"
import image6 from "../images/TEMP/timeline/image6.png"
//import image7 from "../images/TEMP/timeline/image7.png"

import ChartA from "./charts/ChartA"
import ChartB from "./charts/ChartB"

//const images = [null, image1, image2, null, null, null, image4, null, image6]
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
