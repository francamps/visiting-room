import React, { useEffect, useState, useRef } from "react"
import ReactPlayer from "react-player"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Play from "../Play"
import Loading from "../Loading"
import VideoViewedMenu from "./VideoViewedMenu"

import "./VideoPlayer.css"

const getStringTime = seconds => {
  return `${`${Math.floor(seconds / 60)}`.padStart(2, "0")}:${`${Math.floor(
    seconds % 60
  )}`.padStart(2, "0")}s`
}

const VideoPlayer = ({ videoSrcURL, videoTitle, ...props }) => {
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
      console.log("setting true")
      let timer = setTimeout(() => {
        console.log("setting false")
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

  const showEndCard = playerRef.current
    ? playerRef.current.getDuration() - progress.progressSeconds < 15
    : false

  return (
    <>
      <div
        className="video"
        onMouseMove={() => {
          console.log("hello?")
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
              }}
              onPause={() => {
                setPause(true)
              }}
              onEnded={() => {
                // Do something
                //setEnded(true)
              }}
              onProgress={({ played, playedSeconds }) => {
                setProgress({
                  progress: played,
                  progressSeconds: playedSeconds,
                })
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
      {((isPlaying && showControls) || !isPlaying) && (
        <div className="controls">
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
            {playerRef && playerRef.current && (
              <div className="progress-seconds">
                <span>{`${getStringTime(
                  progress.progressSeconds
                )} / ${getStringTime(playerRef.current.getDuration())}`}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default VideoPlayer
