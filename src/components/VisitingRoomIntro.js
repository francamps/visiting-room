import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"

import Play from "./Play"

import "./VideoPlayer.css"
import "./VisitingRoomIntro.css"

const getStringTime = seconds => {
  return `${`${Math.floor(seconds / 60)}`.padStart(2, "0")}:${`${Math.floor(
    seconds % 60
  )}`.padStart(2, "0")}s`
}

const VisitingRoomintro = ({ setShowIntro }) => {
  const videoSrcURL = "https://www.youtube.com/embed/iXI1QJRqPD8"
  const videoTitle = "Introduction: Life at Angola"

  const playerRef = useRef()
  const [isPlaying, setPlaying] = useState(false)
  const [isPaused, setPause] = useState(false)
  const [progress, setProgress] = useState({
    progress: 0,
    progressSeconds: 0,
  })

  const barRef = useRef()

  const onSeek = e => {
    const widthOfBar = barRef.current.getBoundingClientRect().width
    const leftOfBar = barRef.current.getBoundingClientRect().left

    const fraction = (e.clientX - leftOfBar) / widthOfBar
    const duration = playerRef.current.duration

    setProgress({ progress: fraction, progressSeconds: fraction * duration })
    playerRef.current.seekTo(fraction)
  }

  return (
    <div className="vr-intro">
      <div
        className="vr-intro-background"
        onClick={() => {
          // TODO: Catch if outside of video
          console.log("yo")
          setShowIntro(false)
        }}
      ></div>
      <div className="intro">
        {isPlaying && (
          <ReactPlayer
            ref={playerRef}
            url={videoSrcURL}
            className="react-player"
            playing={isPlaying && !isPaused}
            width="100%"
            height="100%"
            onPause={() => {
              setPause(true)
            }}
            onEnded={() => {
              // Do something
              console.log(window.localStorage.getItem("showIntro"))
              window.localStorage.setItem("showIntro", "false")
              console.log(window.localStorage.getItem("showIntro"))
              setShowIntro(false)
            }}
            onProgress={({ played, playedSeconds }) => {
              setProgress({ progress: played, progressSeconds: playedSeconds })
            }}
          />
        )}
        {(!isPlaying || (isPlaying && isPaused)) && (
          <div style={{ position: "absolute" }}>
            <Play
              size="huge"
              onClick={() => {
                window.localStorage.setItem("showIntro", "false")
                setPause(false)
                setPlaying(true)
              }}
            />
          </div>
        )}
      </div>
      {isPlaying && (
        <div className="controls">
          <div className="play-pause-stop">
            {isPlaying && !isPaused ? (
              <div
                className="pause"
                onClick={() => {
                  setPause(true)
                }}
              >
                <div className="pause-tick" />
                <div className="pause-tick" />
              </div>
            ) : (
              <div className="play-wrap">
                <Play
                  onClick={() => {
                    setPause(false)
                    setPlaying(true)
                  }}
                />
              </div>
            )}
          </div>
          <div className="progress-bar" ref={barRef} onClick={onSeek}>
            <div className="progress-bar-bg" />
            <div
              className="progress-bar-played"
              style={{
                width: `${progress.progress * 100}%`,
              }}
            />
          </div>
          <div className="progress-seconds">
            <span>{getStringTime(progress.progressSeconds)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default VisitingRoomintro
