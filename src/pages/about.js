import React, { useState } from "react"
import { RichText } from "prismic-reactjs"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

import Layout from "../components/Layout"
import Header from "../components/Header"
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
            faq_title
          }
        }
      }
    }
  }
`

const About = () => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )
  const [faqNumber, setFaqNumber] = useState(params.get("faq") || 0)

  console.log("hello")

  const updateParams = (param, faqNumber) => {
    params.set(param, faqNumber)
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
  }

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
            <section className="about">
              <Header />
              <div className="copy-wrap" style={{ padding: "100px 0" }}>
                <h2 className="title">{title}</h2>
                <Tabs
                  defaultIndex={params.get("tab") || 0}
                  onSelect={idx => {
                    updateParams("tab", idx)
                  }}
                >
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
                      {faqs.map(({ node }, idx) => {
                        const { faq, faq_title } = node

                        return (
                          <div
                            className={`faq ${
                              idx === +faqNumber ? "faq-active" : ""
                            }`}
                            id={`faq-${idx}`}
                            onClick={() => {
                              updateParams("faq", idx === faqNumber ? -1 : idx)
                              setFaqNumber(idx === faqNumber ? -1 : idx)
                              setTimeout(
                                document
                                  .querySelector(`#faq-${idx}`)
                                  .scrollIntoView({
                                    block: "start",
                                    inline: "nearest",
                                    behavior: "smooth",
                                  }),
                                1200
                              )
                            }}
                          >
                            <h3>{faq_title[0].text}</h3>
                            <div className="faq-content">
                              <RichText render={faq} />
                            </div>
                          </div>
                        )
                      })}
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
                    Enter the Visiting Room
                  </Link>
                </div>
                <div className="link-wrap">
                  <Link to="/history" className="hover-link">
                    Learn the history of life without parole
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
