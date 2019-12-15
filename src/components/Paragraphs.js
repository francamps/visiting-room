import React from "react"

const Paragraphs = ({ paragraphs, setModal }) => {
  return (
    <div className="paragraph-wrap">
      {paragraphs.map(paragraph => {
        if (paragraph.element === "p") {
          return <div className="paragraph">{paragraph.content}</div>
        } else if (paragraph.element === "f") {
          return (
            <div className="footnote-trigger-wrap">
              <div
                className="footnote-trigger"
                onClick={() => setModal(paragraph.content)}
              >
                *
              </div>
            </div>
          )
        } else if (paragraph.element === "q") {
          return <div className="quote">{paragraph.content}</div>
        } else if (paragraph.element === "br") {
          return <p />
        }
        return null
      })}
    </div>
  )
}

export default Paragraphs
