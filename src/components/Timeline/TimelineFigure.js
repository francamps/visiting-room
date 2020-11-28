import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { useInView } from "react-intersection-observer"
import Img from "gatsby-image"
import Media from "react-media"

import ChartC from "../charts/ChartC"
import Map from "../charts/Map"

import "./TimelineFigure.css"

const TimelineFigure = ({ step = 1, caption, images, setFigureActive }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.5,
  })

  return (
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
                    ref={ref}
                    className={`child timeline-figure medium ${
                      inView ? "in-view" : ""
                    } `}
                  >
                    <h3 className="title">
                      Governor's commutations and prison population
                    </h3>
                    {caption && (
                      <p
                        className="caption"
                        style={{
                          textAlign: "left",
                          marginBottom: "20px",
                          fontSize: "var(--font-normal)",
                        }}
                      >
                        {caption}
                      </p>
                    )}
                    <figure>
                      <ChartC />
                    </figure>
                  </section>
                )
              } else if (imageName === "Map") {
                return (
                  <section
                    key={`figure-${step}`}
                    ref={ref}
                    className={` child timeline-figure ${
                      inView ? "in-view" : ""
                    }`}
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
                            {matches.small && (
                              <Map style={{ height: "250px" }} />
                            )}
                            {matches.large && (
                              <Map style={{ height: "500px" }} />
                            )}
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
                    ref={ref}
                    className={` child timeline-figure ${
                      inView ? "in-view" : ""
                    }`}
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
                  </section>
                )
              }
            })}
          </>
        )
      }}
    />
  )
}

export default TimelineFigure
