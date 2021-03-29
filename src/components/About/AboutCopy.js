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
  const childrenAbouts = abouts
    .filter(
      about =>
        about.node.data.about_this_project.text !==
        "About the Visiting Room Project"
    )
    .sort((a, b) => {
      if (a.node.data.about_this_project.text === "About Life Without Parole")
        return -1
      if (a.node.data.about_this_project.text === "About Angola") return 0
      if (a.node.data.about_this_project.text === "About The Angolite") return 1
    })

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
        {
          null /*<div className="map">
          <img src={vrp} style={{ width: "100%", height: "auto" }} />
          </div>*/
        }
      </article>

      <Tabs>
        <TabList>
          {childrenAbouts.map(about => {
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
        {childrenAbouts.map(about => {
          const title = about ? about.node.data.about_this_project.text : ""
          const content = about ? about.node.data.about_content : []

          const isAngola = title === "About Angola"

          return (
            <TabPanel>
              <>
                <h3>{title}</h3>
                <article className="copy">
                  <div
                    className="term-content"
                    dangerouslySetInnerHTML={{ __html: content.html }}
                  ></div>
                  <div className="map">
                    <img
                      src={isAngola ? stateFarm : null}
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
