import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import { animated, useSpring } from "react-spring"

import "./Grid.css"

import { profiles } from "../content/profiles_all"
import GridImage from "./GridImage"

import "./HomeVideo.css"

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

const USE_PRISMIC = true

const Grid = () => {
  /*const fadeInProps = useSpring({
    config: { duration: 2000 },
    to: { opacity: 1 },
    from: {
      opacity: 0,
    },
  })*/

  return (
    <StaticQuery
      query={`${query}`}
      render={data => {
        const allProfiles =
          USE_PRISMIC && data ? data.prismic.allProfiles.edges : profiles

        const imageData = data.images

        return (
          <animated.div
            className="grid"
            style={
              {
                //...fadeInProps,
              }
            }
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
                <GridImage
                  image={image}
                  fullName={fullName}
                  quote={quote}
                  profile_picture={profile_picture}
                />
              )
            })}
          </animated.div>
        )
      }}
    />
  )
}

export default Grid
