import React, { useEffect, useState, useRef } from "react"
import ReactPlayer from "react-player"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import isNull from "lodash/isNull"

import Play from "../Symbols/Play"
import Pause from "../Symbols/Pause"
import Loading from "../Loading"
import VideoViewedMenu from "./VideoViewedMenu"

import "./VideoPlayer.css"

const getStringTime = seconds => {
  return `${`${Math.floor(seconds / 60)}`.padStart(2, "0")}:${`${Math.floor(
    seconds % 60
  )}`.padStart(2, "0")}s`
}

const VideoPlayer = ({ videoSrcURL, videoTitle, autoplay, color }) => {
  const playerRef = useRef()
  const [isLoading, setLoading] = useState(true)
  const [isPlaying, setPlaying] = useState(false)
  const [isPaused, setPause] = useState(false)
  const [progress, setProgress] = useState({
    progress: 0,
    progressSeconds: 0,
  })
  const [progressLabel, setProgressLabel] = useState(null)

  const [showControls, setShowControls] = useState(true)
  const [countDownToHideControls, setCountDownToHideControls] = useState(null)

  const barRef = useRef()

  useEffect(() => {
    let timer
    if (countDownToHideControls === 5000) {
      setShowControls(true)
      let timer = setTimeout(() => {
        setCountDownToHideControls(null)
        setShowControls(false)
      }, countDownToHideControls)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [countDownToHideControls, showControls])

  const getProgressFromMouse = e => {
    const widthOfBar = barRef.current.getBoundingClientRect().width
    const leftOfBar = barRef.current.getBoundingClientRect().left

    const fraction = (e.clientX - leftOfBar) / widthOfBar
    const duration = playerRef.current.getDuration()

    console.log(fraction, duration)

    return { progress: fraction, progressSeconds: fraction * duration }
  }

  const onSeek = e => {
    setPause(true)
    const progressMouse = getProgressFromMouse(e)
    setProgress(progressMouse)
    playerRef.current.seekTo(progressMouse.progress)
  }

  const showEndCard = playerRef.current
    ? playerRef.current.getDuration() - progress.progressSeconds < 15
    : false

  const getBarWidth = () => {
    if (!barRef || !barRef.current) return 0

    const widthOfBar = barRef.current.getBoundingClientRect().width
    return `${widthOfBar * progress.progress}px`
  }

  const getLabelPositiong = () => {
    if (!barRef || !barRef.current) return 0

    const widthOfBar = barRef.current.getBoundingClientRect().width
    const leftOfBar = barRef.current.getBoundingClientRect().left

    const labelPosition = isNull(progressLabel)
      ? 0
      : widthOfBar * progressLabel.progress

    if (isNull(progressLabel)) {
      return widthOfBar * progress.progress > widthOfBar + leftOfBar - 45
        ? `${widthOfBar + leftOfBar - 45}px`
        : getBarWidth()
    }

    return labelPosition > widthOfBar + leftOfBar - 45
      ? `${widthOfBar + leftOfBar}px`
      : `${labelPosition}px`
  }

  return (
    <>
      <div
        className="video"
        onClick={() => {
          if (isPlaying && isPaused) {
            setPlaying(true)
            setPause(false)
          }
        }}
        onMouseMove={() => {
          if (isPlaying) setCountDownToHideControls(5000)
        }}
        onMouseLeave={() => {
          if (isPlaying) setCountDownToHideControls(5000)
        }}
      >
        {isPlaying ? (
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
                if (autoplay) setPlaying(true)
              }}
              onSeek={seconds => {
                const duration = playerRef.current.getDuration()

                setProgress({
                  progress: seconds / duration,
                  progressSeconds: seconds,
                })
                setPause(false)
                setPlaying(true)
              }}
              onPause={() => {
                setPause(true)
              }}
              onEnded={() => {
                // Do something
                //setEnded(true)
              }}
              onProgress={({ played, playedSeconds }) => {
                if (!isPaused) {
                  setProgress({
                    progress: played,
                    progressSeconds: playedSeconds,
                  })
                }
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
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              background: "black",
            }}
          />
        )}
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
                setPause(false)
                setPlaying(true)
              }}
            />
            {videoTitle && !isPaused && (
              <h2 style={{ margin: "60px" }}>{videoTitle}</h2>
            )}
          </div>
        )}
        {false && (
          <VideoViewedMenu
            onClickReplay={() => {
              playerRef.current.seekTo(0)
              setPause(false)
              setPlaying(true)
            }}
            onClickNext={() => {
              // Do Something
            }}
          />
        )}
      </div>
      {true && (
        <div className="controls">
          <div className="progress-bar" onClick={onSeek}>
            <div
              className="progress-bar-bg"
              ref={barRef}
              onMouseMove={e => {
                const progressMouse = getProgressFromMouse(e)
                setProgressLabel(progressMouse)
              }}
              onMouseOut={() => {
                setProgressLabel(null)
              }}
            />
            <div
              className="progress-bar-played"
              style={{
                width: getBarWidth(),
                background: color || "var(--clr-primary)",
              }}
            />
            <div
              className="progress-bar-label"
              style={{
                left: getLabelPositiong(),
              }}
            >
              {!isNull(progressLabel)
                ? getStringTime(progressLabel.progressSeconds)
                : progress.progressSeconds
                ? getStringTime(progress.progressSeconds)
                : "_:_"}
            </div>
          </div>
          <div className="actions">
            <div className="play-pause-stop">
              {isPlaying && !isPaused ? (
                <div className="action-wrap">
                  <Pause
                    onClick={() => {
                      setPause(true)
                    }}
                  />
                </div>
              ) : (
                <div className="action-wrap">
                  <Play
                    onClick={() => {
                      setPause(false)
                      setPlaying(true)
                    }}
                  />
                </div>
              )}
            </div>
            {playerRef && playerRef.current && (
              <div className="progress-seconds">
                <span>{`${
                  progress.progressSeconds
                    ? getStringTime(progress.progressSeconds)
                    : "_:_"
                } / ${getStringTime(playerRef.current.getDuration())}`}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default VideoPlayer
