import React from "react"
import { RichText } from "prismic-reactjs"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

import Header from "../Header"
import Map from "../charts/Map"
import Footer from "./Footer"
import FAQs from "./FAQs.js"

import "./About.css"

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

          <div className="copy-wrap" style={{ padding: "100px 0" }}>
            <TabPanel>
              <article className="copy" style={{ padding: "40px 0" }}>
                <RichText render={content} />
                <div className="map" style={{ height: "500px" }}>
                  <Map style={{ width: "100%", height: "100%" }} />
                </div>
              </article>
            </TabPanel>
            <TabPanel>The Angolite</TabPanel>
            <TabPanel>
              <FAQs faqs={faqs} params={params} updateParams={updateParams} />
            </TabPanel>
            <TabPanel>
              <article className="copy" style={{ padding: "40px 0" }}>
                {terms.map(term => {
                  return <RichText render={term.term1} />
                })}
              </article>
            </TabPanel>
            <TabPanel>Team</TabPanel>
            <TabPanel>Resources</TabPanel>
          </div>
        </Tabs>

        <Footer />
      </section>
    </>
  )
}
export default About
