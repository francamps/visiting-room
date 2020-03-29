import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, navigate } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

import Menu from "../components/Menu"
import Map from "../images/TEMP/timeline/map.png"

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
        console.log(data)

        return (
          <>
            <Menu />
            <div className="copy-wrap" style={{ padding: "100px 0" }}>
              <h2
                style={{
                  marginLeft: "-200px",
                  width: "200%",
                  marginBottom: "40px",
                }}
              >
                {title}
              </h2>
              <Tabs>
                <TabList>
                  <Tab>The project</Tab>
                  <Tab>Glossary</Tab>
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
                        filter: "grayscale(1)",
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
              </Tabs>

              <Link to="/visiting-room">
                <div
                  className="button"
                  onClick={() => {
                    navigate("/visiting-room")
                  }}
                >
                  <div class="link-wrap">
                    <span className="hover-link">Go to the Visiting Room</span>
                  </div>
                </div>
              </Link>
              <Link to="/timeline">
                <div
                  className="button"
                  onClick={() => {
                    navigate("/timeline")
                  }}
                >
                  <div className="link-wrap">
                    <span className="hover-link">
                      Learn the history of Life Without Parole sentencing
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </>
        )
      }}
    />
  )
}

export default About
