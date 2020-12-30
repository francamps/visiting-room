import React from "react"
import { RichText } from "prismic-reactjs"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

import Header from "../Header"
import Map from "../charts/Map"
import Footer from "../Footer"
import Paragraphs from "../Paragraphs"
import FAQs from "./FAQs.js"

import "./About.css"

import { REFERENCES } from "../../content/references"

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
            <Tab>The project</Tab>
            <Tab>The Angolite</Tab>
            <Tab>FAQ</Tab>
            <Tab>Glossary</Tab>
            <Tab>Team</Tab>
            <Tab>Learn more</Tab>
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
                  <Map style={{ width: "100%", height: "100%" }} />
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
