import React, { useState } from "react"
import { navigate, StaticQuery, graphql } from "gatsby"
import { animated, useSpring } from "react-spring"

import "./Grid.css"

import { profiles } from "../content/profiles_all"
import GridImage from "./GridImage"

import video from "../images/ArthurCarter_8s.mp4"
import "./HomeVideo.css"

const query = graphql`
  {
    prismic {
      allProfiles(after: "YXJyYXljb25uZWN0aW9uOjE5") {
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
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

const USE_PRISMIC = true

const Grid = () => {
  const [isHover, setHover] = useState(null)
  const [isDoneFetching, setIsDoneFetching] = useState(false)
  const [cursor, setCursor] = useState(null)

  const fadeInProps = useSpring({
    config: { duration: 2000 },
    to: { opacity: 1 /*, filter: "blur(0)"*/ },
    from: {
      opacity: 0,
      //filter: "blur(1.5rem)",
    },
  })

  return (
    <StaticQuery
      query={`${query}`}
      variables={
        cursor
          ? {
              after: cursor,
            }
          : {}
      }
      render={data => {
        const allProfiles =
          USE_PRISMIC && data ? data.prismic.allProfiles.edges : profiles

        const imageData = data.images

        setCursor(data.prismic.allProfiles.pageInfo.endCursor)
        if (!data.prismic.allProfiles.pageInfo.hasNextPage)
          setIsDoneFetching(true)

        return (
          <animated.div
            className="grid"
            style={{
              ...fadeInProps,
            }}
          >
            {allProfiles.map((node, idx) => {
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

              return (
                <div
                  className={`grid-cell ${idx === isHover ? "hovered" : ""}`}
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
                  {profile_picture && (
                    <div className="cell-background">
                      {idx === isHover && (
                        <div className="gridimage-bg">
                          <video
                            loop
                            muted
                            autoPlay
                            poster={profile_picture}
                            className="fullscreen-bg__video"
                          >
                            {null /*<source src={video} type="video/webm">*/}
                            <source src={video} type="video/mp4" />
                            {null /*<source src={video} type="video/ogg">*/}
                          </video>
                        </div>
                      )}

                      {idx !== isHover && <GridImage image={image} />}
                    </div>
                  )}
                  <div className="cell-hover-layer"></div>
                  {quote && (
                    <div className="cell-hover-quote">
                      <p className="quote">"{quote}"</p>
                    </div>
                  )}
                  <h3
                    className="name-tag"
                    style={{
                      letterSpacing: idx === isHover ? "0.03em" : "normal",
                    }}
                  >
                    {fullName}
                  </h3>
                </div>
              )
            })}
            }
          </animated.div>
        )
      }}
    />
  )
}

export default Grid
