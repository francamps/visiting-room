import React, { useEffect, useState } from "react"

import Loading from "../Loading"
import CrossClose from "../CrossClose"

import { getSeconds } from "../../utils/index.js"
import { handleKeyUp } from "../../utils"

import "./Transcript.css"

const Transcript = ({
  name,
  progress,
  setProgress,
  setShowTranscript,
  duration,
  playerRef,
}) => {
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

  useEffect(() => {
    const activeElement = document.querySelector(".transcript-paragraph.active")
    if (activeElement) activeElement.scrollIntoView()
  }, [transcript])

  return (
    <div className="transcript-panel">
      <h3>{name}</h3>
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
        }}
        onClick={() => {
          setShowTranscript(false)
        }}
        onKeyUp={ev =>
          handleKeyUp(ev, () => {
            setShowTranscript(false)
          })
        }
        role="button"
        tabIndex={0}
      >
        <CrossClose theme="light" />
      </div>
      {!transcript && !error && <Loading hideTitle={true} />}
      {transcript &&
        !error &&
        transcript.map((paragraph, idx) => {
          if (!paragraph.speaker && !paragraph.time) return null

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
              onKeyUp={ev =>
                handleKeyUp(ev, () => {
                  setProgress({
                    progress: getSeconds(paragraph.time) / duration,
                    progressSeconds: +getSeconds(paragraph.time),
                  })
                  if (playerRef.current)
                    playerRef.current.seekTo(
                      getSeconds(paragraph.time) / duration
                    )
                })
              }
              role="button"
              tabIndex={0}
            >
              <div className="block">
                <span className="speaker">{paragraph.speaker}</span>
                <span className="time">{paragraph.time}</span>
              </div>
              <p className="content">{paragraph.content}</p>
              <div className="separator"></div>
            </div>
          )
        })}
      {error && <p>Something went wrong loading the transcript.</p>}
    </div>
  )
}

export default Transcript
