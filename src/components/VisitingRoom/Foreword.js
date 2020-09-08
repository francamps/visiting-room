import React, { useEffect, useState, useRef } from "react"
import ReactPlayer from "react-player"
import { navigate } from "gatsby"

import Play from "../Symbols/Play"
import Pause from "../Symbols/Pause"
import Loading from "../Loading"

import "./Foreword.css"

const videoSrcURL = "https://vimeo.com/444511449"

const getStringTime = seconds => {
  return `${`${Math.floor(seconds / 60)}`.padStart(2, "0")}:${`${Math.floor(
    seconds % 60
  )}`.padStart(2, "0")}s`
}

const Foreword = () => {
  const playerRef = useRef()
  const [isLoading, setLoading] = useState(true)
  const [isPlaying, setPlaying] = useState(false)
  const [isPaused, setPause] = useState(false)
  const [progress, setProgress] = useState({
    progress: 0,
    progressSeconds: 0,
  })
  const [showControls, setShowControls] = useState(true)
  const [countDownToHideControls, setCountDownToHideControls] = useState(null)

  const barRef = useRef()

  useEffect(() => {
    let timer
    if (countDownToHideControls === 5000) {
      setShowControls(true)
      timer = setTimeout(() => {
        setCountDownToHideControls(null)
        setShowControls(false)
      }, countDownToHideControls)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [countDownToHideControls, showControls])

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
          window.localStorage.setItem("showIntro", "false")
          navigate("/visiting-room")
        }}
      ></div>
      <div className="video-container">
        <div
          className="intro"
          onClick={() => {
            if (isPlaying && isPaused) {
              setPlaying(true)
              setPause(false)
            } else if (isPlaying && !isPaused) {
              setPlaying(true)
              setPause(true)
            }
          }}
          onMouseMove={() => {
            if (isPlaying) setCountDownToHideControls(5000)
          }}
          onMouseLeave={() => {
            if (isPlaying) setCountDownToHideControls(5000)
          }}
        >
          {isPlaying && (
            <>
              <ReactPlayer
                ref={playerRef}
                url={videoSrcURL}
                className="react-player"
                playing={isPlaying && !isPaused}
                width="100%"
                height="100%"
                onReady={() => {
                  setLoading(false)
                  setPlaying(true)
                }}
                onPause={() => {
                  setPause(true)
                }}
                onEnded={() => {
                  // Do something
                  if (typeof window !== "undefined")
                    window.localStorage.setItem("showIntro", "false")
                  navigate("/visiting-room")
                }}
                onProgress={({ played, playedSeconds }) => {
                  setProgress({
                    progress: played,
                    progressSeconds: playedSeconds,
                  })
                }}
                config={{
                  vimeo: {
                    playerOptions: {
                      playsinline: 1,
                    },
                  },
                }}
              />
              {isPlaying && isLoading && (
                <div
                  style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Loading />
                </div>
              )}
            </>
          )}
          <div
            className="control-layer"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {(!isPlaying || (isPlaying && isPaused)) && (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Play
                  size="huge"
                  onClick={() => {
                    if (typeof window !== "undefined")
                      window.localStorage.setItem("showIntro", "false")
                    setPause(false)
                    setPlaying(true)
                  }}
                />
              </div>
            )}
          </div>
        </div>
        {isPlaying && (
          <div className={`controls ${!showControls ? "hidden" : ""}`}>
            <div className="progress-bar" ref={barRef} onClick={onSeek}>
              <div className="progress-bar-bg" />
              <div
                className="progress-bar-played"
                style={{
                  width: `${progress.progress * 100}%`,
                }}
              />
            </div>

            <div className="actions">
              <div className="play-pause-stop">
                {isPlaying && !isPaused ? (
                  <Pause
                    useCircle={false}
                    onClick={() => {
                      setPause(true)
                    }}
                  />
                ) : (
                  <div className="play-wrap">
                    <Play
                      useCircle={false}
                      onClick={() => {
                        setPause(false)
                        setPlaying(true)
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                className="video-skip"
                onClick={() => {
                  window.localStorage.setItem("showIntro", "false")
                  navigate("/visiting-room")
                }}
              >
                <p>Skip foreword > </p>
              </div>
              {playerRef && playerRef.current && (
                <div className="progress-seconds">
                  <span>{`${getStringTime(
                    progress.progressSeconds
                  )} / ${getStringTime(
                    playerRef.current.getDuration()
                  )}`}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Foreword
