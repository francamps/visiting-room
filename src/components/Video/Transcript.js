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
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: 0,
                  padding: "4px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "Roboto",
                    fontSize: "var(--font-small)",
                    fontWeight: "bold",
                  }}
                >
                  {paragraph.speaker}
                </span>
                <span
                  style={{
                    fontSize: "var(--font-small)",
                    fontFamily: "Roboto",
                    fontStyle: "italic",
                  }}
                >
                  {paragraph.time}
                </span>
              </div>
              <p
                style={{
                  marginTop: "0px",
                  marginBottom: "4px",
                  lineHeight: "1.2em",
                }}
              >
                {paragraph.content}
              </p>
              <div
                style={{
                  width: "100%",
                  borderLeft: "1px dashed black",
                  opacity: "0.6",
                  height: "20px",
                  marginBottom: "4px",
                  marginTop: "4px",
                }}
              ></div>
            </div>
          )
        })}
      {error && <p>Something went error loading the transcript.</p>}
    </div>
  )
}

export default Transcript
