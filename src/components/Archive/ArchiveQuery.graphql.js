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
  }
`

export default query
