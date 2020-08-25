import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import About from "../components/About/index.js"

export const query = graphql`
  {
    prismic {
      allAbouts {
        edges {
          node {
            about_content
            about_this_project
          }
        }
      }
      allGlossary_terms {
        edges {
          node {
            term {
              term1
            }
          }
        }
      }
      allFaqs {
        edges {
          node {
            faq
            faq_title
          }
        }
      }
    }
  }
`

const AboutPage = () => {
  return (
    <Layout>
      <StaticQuery
        query={`${query}`}
        render={data => {
          const title = data
            ? data.prismic.allAbouts.edges[0].node.about_this_project[0].text
            : ""
          const content = data
            ? data.prismic.allAbouts.edges[0].node.about_content
            : []

          const terms = data
            ? data.prismic.allGlossary_terms.edges[0].node.term
            : []

          const faqs = data ? data.prismic.allFaqs.edges : []

          return (
            <About faqs={faqs} title={title} content={content} terms={terms} />
          )
        }}
      />
    </Layout>
  )
}

export default AboutPage
