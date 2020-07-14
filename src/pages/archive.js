import React, { useEffect, useState, useReducer } from "react"
import { get as getValue } from "lodash"
import { graphql } from "gatsby"

import Archive from "../components/Archive"
import Layout from "../components/Layout"

import profileReducer from "../utils/profileReducer"

const ArchivePage = props => {
  const [fetchProps, setFetchProps] = useState({
    hasNext: getValue(props, "data.prismic.allProfiles.pageInfo.hasNextPage"),
    cursor: getValue(props, "data.prismic.allProfiles.pageInfo.endCursor", ""),
  })

  const firstProfiles = {}
  getValue(props, "data.prismic.allProfiles.edges", []).forEach(({ node }) => {
    const name = getValue(node, "full_name[0].text")
    if (name) firstProfiles[name] = node
  })
  const [profiles, dispatch] = useReducer(profileReducer, firstProfiles)

  const images = getValue(props, "data.images", [])

  useEffect(() => {
    if (fetchProps.hasNext) {
      setTimeout(() => {
        props.prismic
          .load({
            variables: { after: fetchProps.cursor },
          })
          .then(res => {
            setFetchProps({
              hasNext: res.data.allProfiles.pageInfo.hasNextPage,
              cursor: res.data.allProfiles.pageInfo.endCursor,
            })

            const newProfilesDict = {}
            res.data.allProfiles.edges.forEach(({ node }) => {
              const name = getValue(node, "full_name[0].text")
              if (name) newProfilesDict[name] = node
            })
            dispatch(newProfilesDict)
          })
      }, 200)
    }
  }, [fetchProps.cursor, fetchProps.hasNext, props.prismic])

  return (
    <Layout>
      <Archive
        profiles={Object.values(profiles).filter(p => p.show_in_archive)}
        images={images}
      />
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
            show_in_archive
            deceased_date
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
