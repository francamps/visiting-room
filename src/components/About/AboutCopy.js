import React from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import startCase from "lodash/startCase"

import stateFarm from "../../images/stateFarm.png"
import vrp from "../../images/vrp.png"
import { colors } from "../../content/colors"

const AboutCopy = ({ abouts }) => {
  const parentAbout = abouts.find(
    about =>
      about.node.data.about_this_project.text ===
      "About the Visiting Room Project"
  )

  const title = parentAbout ? parentAbout.node.data.about_this_project.text : ""
  const content = parentAbout ? parentAbout.node.data.about_content : []

  return (
    <>
      <h3>{title}</h3>
      <article className="copy">
        <div
          className="term-content"
          dangerouslySetInnerHTML={{ __html: content.html }}
        ></div>
        <div className="map" style={{ height: "500px" }}>
          <img src={vrp} style={{ width: "100%", height: "auto" }} />
        </div>
      </article>

      <Tabs>
        <TabList>
          {abouts.slice(1).map(about => {
            const title = about ? about.node.data.about_this_project.text : ""

            return (
              <Tab>
                <span style={{ background: `var(${colors[5]})` }}>
                  {startCase(title.split("About ")[1])}
                </span>
              </Tab>
            )
          })}
        </TabList>
        {abouts.slice(1).map(about => {
          const title = about ? about.node.data.about_this_project.text : ""
          const content = about ? about.node.data.about_content : []

          const isAngola = title === "About Angola"
          const isVRP = title === "About the Visiting Room Project"

          return (
            <TabPanel>
              <>
                <h3>{title}</h3>
                <article className="copy">
                  <div
                    className="term-content"
                    dangerouslySetInnerHTML={{ __html: content.html }}
                  ></div>
                  <div className="map" style={{ height: "500px" }}>
                    <img
                      src={isAngola ? stateFarm : isVRP ? vrp : null}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <p
                      className="caption"
                      style={{
                        textAlign: "left",
                        marginBottom: "20px",
                        marginTop: "10px",
                        fontSize: "var(--font-small)",
                      }}
                    >
                      {isAngola
                        ? "LSU Libraries Special Collections / Andrew D. Lytle's Baton Rouge Photograph Collection (1900-1901, questionable)"
                        : ""}
                    </p>
                  </div>
                </article>
              </>
            </TabPanel>
          )
        })}
      </Tabs>
    </>
  )
}

export default AboutCopy
