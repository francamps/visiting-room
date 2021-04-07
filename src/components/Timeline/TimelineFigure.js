import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { useInView } from "react-intersection-observer"
import Img from "gatsby-image"

import ChartC from "../charts/ChartC"

import "./TimelineFigure.css"

const TimelineFigure = ({ step = 1, caption, images, setFigureActive }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.1,
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
                    className={`child chart-figure timeline-figure medium ${
                      inView ? "in-view" : ""
                    } `}
                  >
                    {caption && <p className="caption">{caption}</p>}
                    <figure>
                      <ChartC />
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
