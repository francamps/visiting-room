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
            <h3>{faq_title.text}</h3>
            <div
              className="faq-content"
              dangerouslySetInnerHTML={{ __html: faq.html }}
            ></div>
          </div>
        )
      })}
    </article>
  )
}

export default FAQs
