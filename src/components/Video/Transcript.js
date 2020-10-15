import React, { useState } from "react"
import Loading from "../Loading"

const Transcript = ({ name }) => {
  const [transcript, setTranscript] = useState()
  const [error, setError] = useState(false)

  import(
    "../../content/transcripts/" +
      [name.replace(/ /g, "_").toLowerCase()] +
      ".json"
  )
    .then(trans => {
      if (trans.default.transcript) setTranscript(trans.default.transcript)
      setError(false)
    })
    .catch(error => {
      /* Error handling */
      setError(true)
    })

  return (
    <div
      style={{
        background: "var(--clr-off-white)",
        color: "var(--clr-black)",
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        width: "400px",
        padding: "40px",
        boxSizing: "border-box",
        zIndex: 100,
        overflowY: "auto",
      }}
    >
      {!transcript && !error && <Loading hideTitle={true} />}
      {transcript &&
        !error &&
        transcript.map(paragraph => {
          return (
            <>
              <b>
                <p>{paragraph.speaker}</p>
              </b>
              <p style={{ marginTop: "0px" }}>{paragraph.content}</p>
            </>
          )
        })}
      {error && <p>Something went error loading the transcript.</p>}
    </div>
  )
}

export default Transcript
