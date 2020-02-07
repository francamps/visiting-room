import React from "react"

import Menu from "../components/Menu"

import content from "../content/about.json"

import { StaticQuery, graphql } from "gatsby"

export const query = graphql`
  {
    prismic {
      allAbouts {
        edges {
          node {
            about_content
            about_this_project
          }
        }
      }
    }
  }
`

const About = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const title = data
          ? data.prismic.allAbouts.edges[0].node.about_this_project[0].text
          : ""
        const content = data
          ? data.prismic.allAbouts.edges[0].node.about_content
          : []

        return (
          <>
            <Menu />
            <div className="copy-wrap">
              <article className="copy" style={{ padding: "100px 0" }}>
                <h2>{title}</h2>
                {content.map(paragraph => {
                  if (paragraph.type === "paragraph") {
                    return (
                      <p dangerouslySetInnerHTML={{ __html: paragraph.text }} />
                    )
                  } else if (paragraph.type === "heading2") {
                    return (
                      <h2
                        dangerouslySetInnerHTML={{ __html: paragraph.text }}
                      />
                    )
                  }
                  return null
                })}
              </article>
            </div>
          </>
        )
      }}
    />
  )
}

export default About
