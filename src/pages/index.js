import React from "react"

import Layout from "../components/Layout"
import Home from "../components/Home"

import useProfiles from "../utils/useProfiles"

const IndexPage = props => {
  const { fetchProps: loading, profiles, images } = useProfiles(props)

  return (
    <Layout>
      <Home loading={loading} profiles={profiles} images={images} />
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
            show_profile_in_visiting_room
            color
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

export default IndexPage
