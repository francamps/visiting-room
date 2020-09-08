import React from "react"
import { StaticQuery, graphql } from "gatsby"

import About from "../components/About/index.js"

export const query = graphql`
  {
    allPrismicAbout {
      edges {
        node {
          data {
            about_content {
              text
              html
            }
            about_this_project {
              text
              html
            }
          }
        }
      }
    }
    allPrismicGlossaryTerm {
      edges {
        node {
          data {
            term {
              term1 {
                text
                html
              }
            }
          }
        }
      }
    }
    allPrismicFaq {
      edges {
        node {
          data {
            faq {
              text
              html
            }
            faq_title {
              text
              html
            }
          }
        }
      }
    }
  }
`

const AboutPage = () => {
  return (
    <StaticQuery
      query={`${query}`}
      render={data => {
        const title = data
          ? data.allPrismicAbout.edges[0].node.data.about_this_project.text
          : ""
        const content = data
          ? data.allPrismicAbout.edges[0].node.data.about_content
          : []

        const terms = data
          ? data.allPrismicGlossaryTerm.edges[0].node.data.term
          : []

        const faqs = data ? data.allPrismicFaq.edges.map(f => f.node.data) : []

        return (
          <About faqs={faqs} title={title} content={content} terms={terms} />
        )
      }}
    />
  )
}

export default AboutPage
