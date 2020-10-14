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
    allPrismicTeam {
      edges {
        node {
          data {
            team_title {
              text
            }
            team_text {
              text
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
          dataRaw
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

        const team = data ? data.allPrismicTeam.edges[0].node.data : []

        const faqs = data
          ? data.allPrismicFaq.edges
              .map(f => f.node.dataRaw)
              .sort((a, b) => a.rank - b.rank)
          : []

        return (
          <About
            faqs={faqs}
            title={title}
            content={content}
            terms={terms}
            team={team}
          />
        )
      }}
    />
  )
}

export default AboutPage
