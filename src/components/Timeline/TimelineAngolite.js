import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import "./TimelineAngolite.css"
import CrossClose from "../CrossClose"

const TimelineAngolite = ({ onClose }) => {
  const [step, setStep] = useState(0)

  return (
    <StaticQuery
      query={graphql`
        query {
          images: allFile {
            edges {
              node {
                relativePath
                name
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const image0 = data.images.edges.find(n => {
          return n.node.relativePath.includes("timeline/laws_of_life.png")
        })
        const image1 = data.images.edges.find(n => {
          return n.node.relativePath.includes("timeline/image6.jpeg")
        })
        const image2 = data.images.edges.find(n => {
          return n.node.relativePath.includes("timeline/image4.jpg")
        })
        const image3 = data.images.edges.find(n => {
          return n.node.relativePath.includes("timeline/signed_pardon.png")
        })

        return (
          <div className="horizontal-timeline">
            <div className={`h-steps-wrapper h-step-${step}`}>
              <div className="h-step" style={{ marginTop: "-100px" }}>
                <div className="h-step-content">
                  <h2>The Angolite 0</h2>
                  <h2>The voice of Angola</h2>
                  <div style={{ minWidth: "300px", minHeight: "300px" }}>
                    <Img
                      alt={"TODO: NEEDS AN ALT"}
                      fluid={image0.node.childImageSharp.fluid}
                    />
                  </div>
                </div>
              </div>
              <div className="h-step">
                <div className="h-step-content">
                  <h2>The Angolite 1</h2>
                  <h2>The voice of Angola</h2>
                  <div style={{ minWidth: "300px", minHeight: "300px" }}>
                    <Img
                      alt={"TODO: NEEDS AN ALT"}
                      fluid={image1.node.childImageSharp.fluid}
                    />
                  </div>
                </div>
              </div>
              <div className="h-step">
                <div className="h-step-content">
                  <h2>The Angolite 2</h2>
                  <h2>The voice of Angola</h2>
                  <div style={{ minWidth: "300px", minHeight: "300px" }}>
                    <Img
                      alt={"TODO: NEEDS AN ALT"}
                      fluid={image2.node.childImageSharp.fluid}
                    />
                  </div>
                </div>
              </div>
              <div className="h-step">
                <div className="h-step-content">
                  <h2>The Angolite 3</h2>
                  <h2>The voice of Angola</h2>
                  <div style={{ minWidth: "300px", minHeight: "300px" }}>
                    <Img
                      alt={"TODO: NEEDS AN ALT"}
                      fluid={image3.node.childImageSharp.fluid}
                    />
                  </div>
                </div>
              </div>
            </div>
            {step > 0 && (
              <button
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "20px",
                  color: "white",
                  background: "none",
                  outline: "none",
                  border: 0,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setStep(step - 1)
                }}
              >
                {"< Back"}
              </button>
            )}
            {step < 3 && (
              <button
                style={{
                  position: "fixed",
                  top: "50%",
                  right: "20px",
                  color: "white",
                  background: "none",
                  outline: "none",
                  border: 0,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setStep(step + 1)
                }}
              >
                {"Next >"}
              </button>
            )}
            {step === 3 && (
              <div
                style={{
                  width: "140px",
                  height: "20px",
                  lineHeight: "20px",
                  textAlign: "right",
                  fontSize: "var(--font-small)",
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "4px",
                  position: "fixed",
                  top: "50%",
                  right: "20px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={onClose}
              >
                Go back to History >
              </div>
            )}
            <CrossClose onClick={onClose} />
          </div>
        )
      }}
    />
  )
}

export default TimelineAngolite
