import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Media from "react-media"

import ChartC from "./charts/ChartC"
import Map from "./charts/Map"

import "./TimelineFigure.css"

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
                <section
                  key={`figure-${step}`}
                  className="child timeline-figure medium"
                >
                  <figure>
                    <ChartC />
                  </figure>
                </section>
              )
            } else if (imageName === "Map") {
              return (
                <section
                  key={`figure-${step}`}
                  className="child timeline-figure"
                >
                  <figure>
                    <Media
                      queries={{
                        small: "(max-width: 760px)",
                        large: "(min-width: 761px)",
                      }}
                    >
                      {matches => (
                        <>
                          {matches.small && <Map style={{ height: "250px" }} />}
                          {matches.large && <Map style={{ height: "500px" }} />}
                        </>
                      )}
                    </Media>
                  </figure>
                </section>
              )
            } else {
              const image = data.images.edges.find(n => {
                return n.node.relativePath.includes(imageName)
              })

              return (
                <section
                  key={`figure-${step}`}
                  className="child timeline-figure"
                >
                  <figure>
                    <Img
                      alt={"TODO: NEEDS AN ALT"}
                      fluid={image.node.childImageSharp.fluid}
                      imgStyle={{
                        objectFit: "contain",
                      }}
                      onClick={() => {
                        setFigureActive(image)
                      }}
                    />
                    {caption && <p className="caption">{caption}</p>}
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
