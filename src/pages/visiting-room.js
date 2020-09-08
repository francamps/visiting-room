import React from "react"
import { graphql } from "gatsby"

import VisitingRoom from "../components/VisitingRoom/VisitingRoom"

import useProfiles from "../utils/useProfiles"

const VisitingRoomPage = props => {
  const { loading, profiles, images } = useProfiles(props)

  return (
    <VisitingRoom
      loading={loading}
      profiles={Object.values(profiles).filter(
        p => p.show_profile_in_visiting_room
      )}
      images={images}
    />
  )
}

export const query = graphql`
  query getProfilesVR {
    allPrismicProfile {
      edges {
        node {
          data {
            first_name {
              text
            }
            date_of_birth {
              text
            }
            last_name {
              text
            }
            full_name {
              text
            }
            imagepath {
              text
            }
            quote {
              text
            }
            show_profile_in_visiting_room
            color
          }
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
