import React from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

import Header from "../Header"
import Footer from "../Footer"
import Paragraphs from "../Paragraphs"
import FAQs from "./FAQs.js"

import "./About.css"

import { REFERENCES } from "../../content/references"
import { colors } from "../../content/colors"
import image from "../../images/cotton.png"

const About = ({ content, faqs, terms, team }) => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  const updateParams = (param, faqNumber) => {
    params.set(param, faqNumber)
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
  }

  return (
    <>
      <section className="about">
        <Header title="About the project" />
        <Tabs
          defaultIndex={params.get("tab") || 0}
          onSelect={idx => {
            updateParams("tab", idx)
          }}
        >
          <TabList>
            <Tab>
              <span
                style={{
                  backgroundColor: `var(${
                    colors[Math.floor(Math.random() * colors.length)]
                  })`,
                }}
              >
                The project
              </span>
            </Tab>
            <Tab>
              <span
                style={{
                  backgroundColor: `var(${
                    colors[Math.floor(Math.random() * colors.length)]
                  })`,
                }}
              >
                The Angolite
              </span>
            </Tab>
            <Tab>
              <span
                style={{
                  backgroundColor: `var(${
                    colors[Math.floor(Math.random() * colors.length)]
                  })`,
                }}
              >
                FAQ
              </span>
            </Tab>
            <Tab>
              <span
                style={{
                  backgroundColor: `var(${
                    colors[Math.floor(Math.random() * colors.length)]
                  })`,
                }}
              >
                Glossary
              </span>
            </Tab>
            <Tab>
              <span
                style={{
                  backgroundColor: `var(${
                    colors[Math.floor(Math.random() * colors.length)]
                  })`,
                }}
              >
                Team
              </span>
            </Tab>
            <Tab>
              <span
                style={{
                  backgroundColor: `var(${
                    colors[Math.floor(Math.random() * colors.length)]
                  })`,
                }}
              >
                Learn more
              </span>
            </Tab>
          </TabList>

          <div className="copy-wrap">
            <TabPanel>
              <h3>About The Visiting Room Project</h3>
              <article className="copy">
                <div
                  className="term-content"
                  dangerouslySetInnerHTML={{ __html: content.html }}
                ></div>
                <div className="map" style={{ height: "500px" }}>
                  <img src={image} style={{ width: "100%", height: "100%" }} />
                  <p
                    className="caption"
                    style={{
                      textAlign: "left",
                      marginBottom: "20px",
                      marginTop: "10px",
                      fontSize: "var(--font-small)",
                    }}
                  >
                    {
                      "LSU Libraries Special Collections / Andrew D. Lytle's Baton Rouge Photograph Collection (1900-1901, questionable)"
                    }
                  </p>
                </div>
              </article>
            </TabPanel>
            <TabPanel>
              <h3>The Angolite</h3>
            </TabPanel>
            <TabPanel>
              <h3>Frequently Asked Questions (FAQs)</h3>
              <FAQs faqs={faqs} params={params} updateParams={updateParams} />
            </TabPanel>
            <TabPanel>
              <h3>Glossary</h3>
              <article className="copy">
                {terms.map(({ term1 }) => (
                  <div
                    className="term-content"
                    dangerouslySetInnerHTML={{ __html: term1.html }}
                  ></div>
                ))}
              </article>
            </TabPanel>
            <TabPanel>
              <h3>{team.team_title[0].text}</h3>
              <article className="copy">
                <div className="term-content">
                  <p>{team.team_text[0].text}</p>
                </div>
              </article>
            </TabPanel>
            <TabPanel>
              <>
                <h3>Resources</h3>
                <Paragraphs paragraphs={REFERENCES} />
              </>
            </TabPanel>
          </div>
        </Tabs>
      </section>
      <Footer withHistory />
    </>
  )
}
export default About
