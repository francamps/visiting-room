import React from "react"
import { RichText } from "prismic-reactjs"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

import Layout from "../components/Layout"
import Menu from "../components/Menu"
import Map from "../components/charts/Map"

import "../components/About.css"

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
          }
        }
      }
    }
  }
`

const About = () => {
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

          const faqs = data ? data.prismic.allFaqs.edges[0].node.faq : []

          return (
            <section className="about">
              <Menu />
              <div className="copy-wrap" style={{ padding: "100px 0" }}>
                <h2 className="title">{title}</h2>
                <Tabs>
                  <TabList>
                    <Tab>The project</Tab>
                    <Tab>FAQ</Tab>
                    <Tab>Glossary</Tab>
                  </TabList>

                  <TabPanel>
                    <article className="copy" style={{ padding: "40px 0" }}>
                      <RichText render={content} />
                      <div className="map" style={{ height: "500px" }}>
                        <Map style={{ width: "100%", height: "100%" }} />
                      </div>
                    </article>
                  </TabPanel>
                  <TabPanel>
                    <article className="copy" style={{ padding: "40px 0" }}>
                      <RichText render={faqs} />
                    </article>
                  </TabPanel>
                  <TabPanel>
                    <article className="copy" style={{ padding: "40px 0" }}>
                      {terms.map(term => {
                        return <RichText render={term.term1} />
                      })}
                    </article>
                  </TabPanel>
                </Tabs>

                <div className="link-wrap">
                  <Link to="/visiting-room" className="hover-link">
                    Go to the Visiting Room
                  </Link>
                </div>
                <div className="link-wrap">
                  <Link to="/history" className="hover-link">
                    Learn the history of Life Without Parole sentencing
                  </Link>
                </div>
              </div>
            </section>
          )
        }}
      />
    </Layout>
  )
}

export default About
