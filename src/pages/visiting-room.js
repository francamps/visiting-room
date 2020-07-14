import React from "react"

import Layout from "../components/Layout"
import VisitingRoom from "../components/VisitingRoom"

import useProfiles from "../utils/useProfiles"

const VisitingRoomPage = props => {
  const { fetchProps: loading, profiles, images } = useProfiles(props)

  return (
    <Layout>
      <VisitingRoom
        loading={loading}
        profiles={Object.values(profiles).filter(
          p => p.show_profile_in_visiting_room
        )}
        images={images}
      />
    </Layout>
  )
}

export const query = graphql`
  query getProfilesVR($after: String) {
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

export default VisitingRoomPage
