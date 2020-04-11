import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { animated } from "react-spring"

import { profiles } from "../content/profiles_all"
import GridImage from "./GridImage"

import "./Grid.css"
import "./HomeVideo.css"

const USE_PRISMIC = true

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

const Grid = ({ searchTerm }) => {
  return (
    <StaticQuery
      query={`${query}`}
      render={data => {
        const allProfiles =
          USE_PRISMIC && data ? data.prismic.allProfiles.edges : profiles

        const imageData = data.images

        return (
          <animated.div className="grid">
            {allProfiles
              .filter(node => {
                const profile = USE_PRISMIC ? node.node : node
                if (searchTerm === null || searchTerm === "") return true
                if (
                  profile.full_name &&
                  profile.full_name[0].text.indexOf(searchTerm) > -1
                )
                  return true
              })
              .map((node, idx) => {
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
