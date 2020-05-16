import React, { useEffect, useState, useReducer } from "react"
import { get as getValue } from "lodash"
import { graphql } from "gatsby"
import { getCursorFromDocumentIndex } from "gatsby-source-prismic-graphql"

import Layout from "../components/Layout"

import VisitingRoom from "../components/VisitingRoom"

const profileReducer = (state, action) => {
  const newState = [...state]
  return newState.concat(action)
}

const VisitingRoomPage = props => {
  const [hasNext, setHasNext] = useState(
    getValue(props, "data.prismic.allProfiles.pageInfo.hasNextPage")
  )
  const [cursor, setCursor] = useState(
    getValue(props, "data.prismic.allProfiles.pageInfo.endCursor", "")
  )

  const [profiles, dispatch] = useReducer(
    profileReducer,
    getValue(props, "data.prismic.allProfiles.edges", [])
  )

  const images = getValue(props, "data.images", [])

  useEffect(() => {
    if (hasNext) {
      props.prismic
        .load({
          variables: { after: cursor },
        })
        .then(res => {
          setHasNext(res.data.allProfiles.pageInfo.hasNextPage)

          const cursor = getCursorFromDocumentIndex(profiles.length)
          setCursor(cursor)

          const newProfiles = res.data.allProfiles.edges
          dispatch(newProfiles)
        })
    }
  }, [cursor, hasNext])

  return (
    <Layout>
      <VisitingRoom loading={hasNext} profiles={profiles} images={images} />
    </Layout>
  )
}

export const query = graphql`
  query getProfiles($after: String) {
    prismic {
      allProfiles(after: $after) {
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
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`

export default VisitingRoomPage
