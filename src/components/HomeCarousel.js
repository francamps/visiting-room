import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link, navigate } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import GridImage from "./GridImage"
import "./HomeCarousel.css"

import { profiles } from "../content/profiles_all"

const USE_PRISMIC = true

const HomeCarousel = () => {
  const [isHover, setHover] = useState(null)

  const query = graphql`
    {
      prismic {
        allProfiles(after: "YXJyYXljb25uZWN0aW9uOjEx") {
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          edges {
            node {
              first_name
              date_of_birth
              last_name
              full_name
              imagepath
              quote
              profile_picture
            }
            cursor
          }
        }
      }
      images: allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  `

  return (
    <div className="carousel">
      <StaticQuery
        query={`${query}`}
        render={data => {
          const allProfiles =
            USE_PRISMIC && data ? data.prismic.allProfiles.edges : profiles

          const imageData = data.images
          return (
            <div className="carousel-row">
              {allProfiles.slice(8).map((node, idx) => {
                const profile = USE_PRISMIC ? node.node : node
                const profile_picture = USE_PRISMIC
                  ? profile.imagepath[0].text
                  : profile.imagePath
                const quote =
                  USE_PRISMIC && profile.quote
                    ? profile.quote[0].text
                    : profile.quote
                const fullName = USE_PRISMIC
                  ? profile.full_name[0].text
                  : profile.name

                const image = imageData.edges.find(n => {
                  return n.node.relativePath.includes(profile_picture)
                })

                if (!image) return null

                return (
                  <div
                    className={`carousel-cell ${
                      idx === isHover ? "hovered" : ""
                    }`}
                    onMouseEnter={() => {
                      setHover(idx)
                    }}
                    onMouseLeave={() => {
                      setHover(null)
                    }}
                    onClick={() => {
                      navigate(`/visiting-room/${"arthur-carter"}`)
                    }}
                  >
                    <BackgroundImage
                      fluid={image.node.childImageSharp.fluid}
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundPosition: "bottom center",
                        backgroundRepeat: "repeat-y",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="cell-hover-layer"></div>
                      {quote && (
                        <div className="cell-hover-quote">
                          <p className="quote">"{quote}"</p>
                        </div>
                      )}
                      <h3 className="name-tag">{fullName}</h3>
                    </BackgroundImage>
                  </div>
                )
              })}
            </div>
          )
        }}
      />
    </div>
  )
}

export default HomeCarousel
