import React from "react"
import { RichText } from "prismic-reactjs"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

import Layout from "../components/layout"
import Menu from "../components/Menu"
import Map from "../images/TEMP/timeline/map.png"

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

          return (
            <section className="about">
              <Menu />
              <div className="copy-wrap" style={{ padding: "100px 0" }}>
                <h2 className="title">{title}</h2>
                <Tabs>
                  <TabList>
                    <Tab>The project</Tab>
                    <Tab>Glossary</Tab>
                    <Tab>Credits</Tab>
                    <Tab>FAQ</Tab>
                  </TabList>

                  <TabPanel>
                    <article className="copy" style={{ padding: "40px 0" }}>
                      <RichText render={content} />
                      <div
                        className="map-figure"
                        style={{
                          height: "400px",
                          backgroundImage: `url(${Map})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: "grayscale(2)",
                        }}
                      />
                    </article>
                  </TabPanel>
                  <TabPanel>
                    <article className="copy" style={{ padding: "40px 0" }}>
                      {terms.map(term => {
                        return <RichText render={term.term1} />
                      })}
                    </article>
                  </TabPanel>
                  <TabPanel>
                    <article className="copy">
                      <p>Something else something else something else</p>
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
