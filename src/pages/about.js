import React from "react"
import { RichText } from "prismic-reactjs"

import Menu from "../components/Menu"

import { StaticQuery, graphql } from "gatsby"

import Map from "../images/TEMP/timeline/map.png"

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
      query={`${query}`}
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
                <h2 style={{ marginLeft: "-200px", width: "200%" }}>{title}</h2>
                <RichText render={content} />
                <div
                  className="map-figure"
                  style={{
                    height: "400px",
                    backgroundImage: `url(${Map})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(1)",
                  }}
                />
              </article>
            </div>
          </>
        )
      }}
    />
  )
}

export default About
