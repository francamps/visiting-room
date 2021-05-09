import React from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

import AboutCopy from "./AboutCopy"
import Glossary from "./Glossary"
import Header from "../Header"
import FAQs from "./FAQs.js"

import { colors } from "../../content/colors"

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
        <Header title="About the Project" />
        <Tabs
          defaultIndex={params.get("tab") || 0}
          onSelect={idx => {
            updateParams("tab", idx)
          }}
        >
          <TabList>
            <Tab>
              <span style={{ background: `var(${colors[0]})` }}>About</span>
            </Tab>
            <Tab>
              <span
                style={{
                  backgroundColor: `var(${colors[1]})`,
                }}
              >
                FAQ
              </span>
            </Tab>
            <Tab>
              <span
                style={{
                  backgroundColor: `var(${colors[17]})`,
                }}
              >
                Glossary
              </span>
            </Tab>
            <Tab>
              <span
                style={{
                  backgroundColor: `var(${colors[23]})`,
                }}
              >
                Team
              </span>
            </Tab>
          </TabList>

          <div className="copy-wrap">
            <TabPanel>
              <h3>About</h3>
              <AboutCopy
                abouts={abouts}
                params={params}
                updateParams={updateParams}
              />
            </TabPanel>
            <TabPanel>
              <h3>Frequently Asked Questions</h3>
              <FAQs faqs={faqs} params={params} updateParams={updateParams} />
            </TabPanel>
            <TabPanel>
              <h3>Glossary</h3>
              <Glossary
                terms={terms}
                params={params}
                updateParams={updateParams}
              />
            </TabPanel>
            <TabPanel>
              <h3>{team.team_title.text}</h3>
              <article className="copy">
                <div className="term-content">
                  <p>{team.team_text.text}</p>
                  <div
                    className="term-content"
                    dangerouslySetInnerHTML={{ __html: team.team_text.html }}
                  ></div>
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
