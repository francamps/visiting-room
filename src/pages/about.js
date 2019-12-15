import React from "react"

import Menu from "../components/Menu"

import content from "../content/about.json"

const About = () => {
  return (
    <>
      <Menu />
      <div className="copy-wrap">
        <article className="copy" style={{ padding: "100px 0" }}>
          <h2>{content.title}</h2>
          {content.content.map(paragraph => {
            if (paragraph.element === "paragraph") {
              return <p>{paragraph.content}</p>
            } else if (paragraph.element === "sectionTitle") {
              return <h2>{paragraph.content}</h2>
            }
            return null
          })}
        </article>
      </div>
    </>
  )
}

export default About
