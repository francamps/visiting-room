const query = `
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

export default query
