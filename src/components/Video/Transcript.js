import React, { useState } from "react"
import Loading from "../Loading"

import "./Transcript.css"

import { getSeconds } from "../../utils/index.js"

const Transcript = ({ name, progress, setProgress, duration, playerRef }) => {
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
    <div className="transcript-panel">
      {!transcript && !error && <Loading hideTitle={true} />}
      {transcript &&
        !error &&
        transcript.map((paragraph, idx) => {
          const isActive =
            paragraph.upperBoundTime &&
            progress.progressSeconds < getSeconds(paragraph.upperBoundTime) &&
            paragraph.time &&
            progress.progressSeconds > getSeconds(paragraph.time)

          const isPast =
            paragraph.upperBoundTime &&
            progress.progressSeconds > getSeconds(paragraph.upperBoundTime)

          return (
            <div
              className={`transcript-paragraph ${isActive ? "active" : ""} ${
                isPast ? "past" : ""
              }`}
              onClick={() => {
                setProgress({
                  progress: getSeconds(paragraph.time) / duration,
                  progressSeconds: +getSeconds(paragraph.time),
                })
                if (playerRef.current)
                  playerRef.current.seekTo(
                    getSeconds(paragraph.time) / duration
                  )
              }}
            >
              <b>
                <p style={{ marginBottom: 0 }}>{paragraph.speaker}</p>
              </b>
              <i>
                <p
                  style={{
                    fontSize: "var(--font-small)",
                    margin: 0,
                    marginBottom: "12px",
                  }}
                >
                  {paragraph.time}
                </p>
              </i>
              <p style={{ marginTop: "0px" }}>{paragraph.content}</p>
            </div>
          )
        })}
      {error && <p>Something went error loading the transcript.</p>}
    </div>
  )
}

export default Transcript
