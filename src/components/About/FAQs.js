import React, { useState } from "react"
import { RichText } from "prismic-reactjs"

import "./FAQs.css"

const FAQs = ({ faqs, params, updateParams }) => {
  const [faqNumber, setFaqNumber] = useState(params.get("faq") || 0)

  return (
    <article className="copy" style={{ padding: "40px 0" }}>
      {faqs.map(({ faq, faq_title }, idx) => {
        return (
          <div
            className={`faq ${idx === +faqNumber ? "faq-active" : ""}`}
            id={`faq-${idx}`}
            onClick={() => {
              updateParams("faq", idx === faqNumber ? -1 : idx)
              setFaqNumber(idx === faqNumber ? -1 : idx)
              setTimeout(
                document.querySelector(`#faq-${idx}`).scrollIntoView({
                  block: "start",
                  inline: "nearest",
                  behavior: "smooth",
                }),
                1200
              )
            }}
          >
            <h3>{faq_title[0].text}</h3>
            <div className="faq-content">
              {faq.map(paragraph => {
                return paragraph.type === "paragraph" ? (
                  <p>{paragraph.text}</p>
                ) : (
                  <div />
                )
              })}
            </div>
          </div>
        )
      })}
    </article>
  )
}

export default FAQs
