import React from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import startCase from "lodash/startCase"

import AboutCopy from "./AboutCopy"
import Header from "../Header"
import FAQs from "./FAQs.js"
import Footer from "../Footer"
import Paragraphs from "../Paragraphs"

import { colors } from "../../content/colors"
import { REFERENCES } from "../../content/references"

import "./About.css"

const About = ({ abouts, faqs, terms, team }) => {
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
              <span style={{ background: `var(${colors[5]})` }}>About</span>
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
          </TabList>

          <div className="copy-wrap">
            <TabPanel>
              <AboutCopy abouts={abouts} />
            </TabPanel>
            <TabPanel>
              <h3>Frequently Asked Questions (FAQs)</h3>
              <FAQs faqs={faqs} params={params} updateParams={updateParams} />
            </TabPanel>
            <TabPanel>
              <h3>Glossary</h3>
              <article className="copy">
                {terms.map(({ term1, ...props }) => {
                  const defined = term1.text.split(" – ")[0]
                  const definition = term1.text.split(" – ")[1]

                  console.log(term1.text.split(" – "), props)
                  return (
                    <div className="term-content">
                      <p>
                        <strong style={{ color: "var(--clr-primary)" }}>
                          {defined}
                        </strong>{" "}
                        - {definition}
                      </p>
                    </div>
                  )
                })}
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
          </div>
        </Tabs>
      </section>
      {null /*<Footer withHistory />*/}
    </>
  )
}
export default About
