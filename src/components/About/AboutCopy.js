import React from "react"

import stateFarm from "../../images/stateFarm.png"
import vrp from "../../images/vrp.png"

const AboutCopy = ({ about }) => {
  const title = about ? about.node.data.about_this_project.text : ""
  const content = about ? about.node.data.about_content : []

  const isAngola = title === "About Angola"
  const isVRP = title === "About the Visiting Room Project"

  return (
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
  )
}

export default AboutCopy
