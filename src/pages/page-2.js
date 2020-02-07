import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  {
    prismic {
      allProfiles {
        edges {
          node {
            first_name
            date_of_birth
            last_name
            full_name
          }
        }
      }
    }
  }
`

const SecondPage = ({ data }) => {
  const profiles = data.prismic.allProfiles.edges

  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Hi from the second page</h1>
      {profiles.map(p => {
        console.log(p)
        return (
          <>
            <h3>{p.node.full_name[0].text}</h3>
            <p>{p.node.first_name[0].text}</p>
            <p>{p.node.last_name[0].text}</p>
          </>
        )
      })}
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage
