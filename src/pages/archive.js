import React, { useEffect, useState, useReducer } from "react"
import { get as getValue } from "lodash"
import { graphql } from "gatsby"
import { getCursorFromDocumentIndex } from "gatsby-source-prismic-graphql"

import Archive from "../components/Archive"
import Layout from "../components/Layout"

import profileReducer from "../utils/profileReducer"

const ArchivePage = props => {
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
    // TODO: Apply this pagination only on demand
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
      <Archive profiles={profiles.map(p => p.node)} images={images} />
    </Layout>
  )
}

export const query = graphql`
  query getArchive($after: String) {
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
            date_of_offense
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

export default ArchivePage
