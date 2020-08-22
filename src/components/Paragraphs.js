import React from "react"

import "./Paragraphs.css"

const Paragraphs = ({ paragraphs, setModal, step }) => {
  return (
    <div className="paragraph-wrap">
      {paragraphs.map((paragraph, idx) => {
        if (paragraph.element === "h2") {
          return (
            <div className="fadein" key={`paragraph-${idx}-${step && step}`}>
              <h2 style={{ color: "black", textAlign: "center" }}>
                {paragraph.content}
              </h2>
              <div
                className="paragraph"
                style={{
                  color: "black",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                <p>{paragraph.subcontent}</p>
              </div>
            </div>
          )
        } else if (paragraph.element === "p") {
          return (
            <div key={`paragraph-${idx}-${step && step}`} className="paragraph">
              {paragraph.content}
            </div>
          )
        } else if (paragraph.element === "f") {
          return (
            <div
              key={`paragraph-${idx}-${step && step}`}
              className="footnote-trigger-wrap"
            >
              <div
                className="footnote-trigger"
                onClick={e => {
                  e.stopPropagation()
                  setModal(paragraph.content)
                }}
              >
                {paragraph.trigger ? (
                  <div className="link-wrap">
                    <span className="hover-link">{paragraph.trigger}</span>
                  </div>
                ) : (
                  "*"
                )}
              </div>
            </div>
          )
        } else if (paragraph.element === "ref") {
          return (
            <div
              key={`paragraph-${idx}-${step && step}`}
              className="paragraph ref"
              style={{}}
            >
              <span style={{ position: "absolute" }}>{paragraph.trigger}</span>
            </div>
          )
        } else if (paragraph.element === "br") {
          return <p key={`paragraph-${idx}-${step && step}`} />
        } else if (paragraph.element === "li") {
          return (
            <div
              key={`paragraph-${idx}-${step && step}`}
              className="paragraph reference"
            >
              <li>
                <b>{`${idx + 1}.`}</b>
                {` ${paragraph.content}`}
              </li>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export default Paragraphs
