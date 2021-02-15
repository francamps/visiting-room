import React from "react"
import { Link } from "gatsby"

import "./Paragraphs.css"

const Paragraphs = ({ paragraphs, setModal, step, theme }) => {
  return (
    <div className={`paragraph-wrap ${theme === "light" ? "light" : ""}`}>
      {paragraphs.map((paragraph, idx) => {
        if (paragraph.element === "p") {
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
              style={{ width: paragraph.trigger > 9 ? "24px" : "12px" }}
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
        } else if (paragraph.element === "link") {
          return (
            <div
              key={`paragraph-${idx}-${step && step}`}
              className="paragraph link link-wrap"
            >
              <Link to={paragraph.url} className="hover-link">
                {paragraph.content}
              </Link>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export default Paragraphs
