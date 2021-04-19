import React, { useEffect, useState } from "react"

import { handleKeyUp } from "../../utils"

import "./Glossary.css"

const Glossary = ({ terms, params, updateParams }) => {
  const [termNumber, setTermNumber] = useState(params.get("term") || 0)

  useEffect(() => {
    if (
      params.get("term") &&
      document.querySelector(`#term-${params.get("term")}`)
    ) {
      setTimeout(
        document.querySelector(`#term-${params.get("term")}`).scrollIntoView({
          block: "start",
          inline: "nearest",
          behavior: "smooth",
        }),
        1200
      )
    }
  }, [])

  return (
    <article className="copy">
      {terms.map(({ term1, ...props }, idx) => {
        const defined = term1.text.split(" – ")[0]
        const definition = term1.text.split(" – ")[1]

        return (
          <div
            className={`term ${idx === +termNumber ? "term-active" : ""}`}
            id={`term-${idx}`}
            onClick={() => {
              updateParams("term", idx === termNumber ? -1 : idx)
              setTermNumber(idx === termNumber ? -1 : idx)
            }}
            onKeyUp={ev =>
              handleKeyUp(ev, () => {
                updateParams("term", idx === termNumber ? -1 : idx)
                setTermNumber(idx === termNumber ? -1 : idx)
              })
            }
            role="button"
            tabIndex={0}
            aria-label={`See ${defined}`}
          >
            <h4>{defined}</h4>
            <div className="term-content">
              <p>{definition}</p>
            </div>
          </div>
        )
      })}
    </article>
  )
}

export default Glossary
