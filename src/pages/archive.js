import React from "react"
import { graphql } from "gatsby"

import ArchiveData from "../components/Archive/ArchiveData"

const ArchivePage = props => {
  return <ArchiveData {...props} />
}

export const query = graphql`
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
            time_served {
              text
            }
            age_at_interview {
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
            deceased_date
            profile_picture {
              fluid(maxWidth: 1000, maxHeight: 800) {
                src
              }
            }
            old_picture {
              fluid(maxWidth: 1000, maxHeight: 800) {
                src
              }
            }
            show_in_archive
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

export default ArchivePage
