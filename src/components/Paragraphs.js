import React from "react"

const Paragraphs = ({ paragraphs, setModal }) => {
  return (
    <div className="paragraph-wrap">
      {paragraphs.map((paragraph, idx) => {
        if (paragraph.element === "p") {
          return (
            <div key={`paragraph-${idx}`} className="paragraph">
              {paragraph.content}
            </div>
          )
        } else if (paragraph.element === "f") {
          return (
            <div key={`paragraph-${idx}`} className="footnote-trigger-wrap">
              <div
                className="footnote-trigger"
                onClick={() => setModal(paragraph.content)}
              >
                *
              </div>
            </div>
          )
        } else if (paragraph.element === "q") {
          return (
            <div key={`paragraph-${idx}`} className="quote">
              {paragraph.content}
            </div>
          )
        } else if (paragraph.element === "br") {
          return <p key={`paragraph-${idx}`} />
        }
        return null
      })}
    </div>
  )
}

export default Paragraphs
