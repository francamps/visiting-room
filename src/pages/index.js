import React from "react"
import { graphql } from "gatsby"

import Home from "../components/Home/Home"

import useProfiles from "../utils/useProfiles"

const IndexPage = props => {
  const { images } = useProfiles(props)

  return <Home images={images} />
}

export const query = graphql`
  query getProfiles {
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
