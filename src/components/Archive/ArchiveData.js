import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Archive from "./Archive"

import useProfiles from "../../utils/useProfiles"

const QUERY = graphql`
  query getArchive {
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
            date_of_offense
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
            show_in_archive
            color
            profile_picture {
              fluid(maxWidth: 1000, maxHeight: 800) {
                ...GatsbyPrismicImageFluid
              }
            }
            old_picture {
              fluid(maxWidth: 1000, maxHeight: 800) {
                ...GatsbyPrismicImageFluid
              }
            }
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

const ArchiveData = () => {
  const data = useStaticQuery(QUERY)

  const { loading, profiles, images } = useProfiles({ data })

  return (
    <Archive
      profiles={Object.values(profiles).filter(p => p.show_in_archive)}
      loading={loading}
      images={images}
    />
  )
}

export default ArchiveData
