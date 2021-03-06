import React, { useState } from "react"

import { handleKeyUp } from "../../utils"

import "./FAQs.css"

const FAQs = ({ faqs, params, updateParams }) => {
  const [faqNumber, setFaqNumber] = useState(params.get("faq") || 0)

  return (
    <article className="copy">
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
            onKeyUp={ev =>
              handleKeyUp(ev, () => {
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
              })
            }
            role="button"
            tabIndex={0}
            aria-label={`See ${faq_title[0].text}`}
          >
            <h4>{faq_title[0].text}</h4>
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
