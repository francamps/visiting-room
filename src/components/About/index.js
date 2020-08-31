import React from "react"
import { RichText } from "prismic-reactjs"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

import Header from "../Header"
import Map from "../charts/Map"
import Footer from "./Footer"
import Paragraphs from "../Paragraphs"
import FAQs from "./FAQs.js"

import "./About.css"

import { REFERENCES } from "../../content/references"

const About = ({ content, faqs, terms, title }) => {
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
        <Header />
        <h2 className="title">About The Visiting Room Project</h2>
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
              <article className="copy">
                <RichText render={content} />
                <div className="map" style={{ height: "500px" }}>
                  <Map style={{ width: "100%", height: "100%" }} />
                </div>
              </article>
            </TabPanel>
            <TabPanel>
              <h3>The Angolite</h3>
            </TabPanel>
            <TabPanel>
              <FAQs faqs={faqs} params={params} updateParams={updateParams} />
            </TabPanel>
            <TabPanel>
              <article className="copy">
                {terms.map(term => {
                  return <RichText render={term.term1} />
                })}
              </article>
            </TabPanel>
            <TabPanel>Team</TabPanel>
            <TabPanel>
              <>
                <h2>Resources</h2>
                <Paragraphs paragraphs={REFERENCES} />
              </>
            </TabPanel>
          </div>
        </Tabs>

        <Footer />
      </section>
    </>
  )
}
export default About