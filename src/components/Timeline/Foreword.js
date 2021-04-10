import React, { useEffect, useState, useRef } from "react"
import Player from "@vimeo/player"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import isNull from "lodash/isNull"

import Play from "../Symbols/Play"
import Loading from "../Loading"
import VideoPlayerControls from "../Video/VideoPlayerControls"

import useKeyPress from "../../utils/useKeyPressed"
import { handleKeyUp } from "../../utils"

import "./Foreword.css"

const Foreword = ({ inView }) => {
  const [isLoading, setLoading] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const [isPaused, setPause] = useState(false)
  const [duration, setDuration] = useState(null)
  const [progress, setProgress] = useState({
    progress: 0,
    progressSeconds: 0,
  })
  const [videoPlayer, setVideoPlayer] = useState(null)

  const [showControls, setShowControls] = useState(true)
  const [countDownToHideControls, setCountDownToHideControls] = useState(null)
  const handleFullScreen = useFullScreenHandle()
  const spacePress = useKeyPress(32)
  const escPress = useKeyPress(27)

  const barRef = useRef()
  const videoPlayerRef = useRef()

  useEffect(() => {
    if (isNull(videoPlayer) && videoPlayerRef.current) {
      setVideoPlayer(
        new Player(videoPlayerRef.current, {
          autoplay: 1,
          controls: false,
          title: false,
          muted: 1,
        })
      )
    }
  }, [videoPlayerRef.current])

  useEffect(() => {
    if (videoPlayer) {
      videoPlayer.getDuration().then(duration => {
        setDuration(duration)
      })
      videoPlayer.on("play", () => {
        setLoading(false)
        setPlaying(true)
        setPause(false)
      })
      videoPlayer.on("pause", () => {
        setPause(true)
      })
      videoPlayer.on("bufferstart", () => {
        console.log("buffering")
        setLoading(true)
      })
      videoPlayer.on("bufferend", () => {
        setLoading(false)
      })
    }
  }, [videoPlayer])

  useEffect(() => {
    if (videoPlayer) {
      if (!isPlaying) {
        videoPlayer.play()
      }

      videoPlayer.on("timeupdate", ({ percent, seconds }) => {
        setPlaying(true)
        setProgress({
          progress: percent,
          progressSeconds: seconds,
        })
      })
    }
  }, [isPlaying])

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

  useEffect(() => {
    if (videoPlayer) {
      if (!isPlaying) {
        videoPlayer.play()
      }
      if (isPlaying) {
        videoPlayer.pause()
      }
    }
  }, [spacePress])

  useEffect(() => {
    if (handleFullScreen.active) {
      handleFullScreen.exit()
    }
  }, [escPress])

  return (
    <div className="foreword-wrap">
      <FullScreen handle={handleFullScreen}>
        <div
          className={`vr-intro ${
            handleFullScreen.active ? "vr-intro-fullscreen" : ""
          }`}
        >
          <div className="video-container">
            <div
              className="intro"
              onClick={() => {
                if (videoPlayer) {
                  videoPlayer.getPaused().then(paused => {
                    console.log(paused)
                    if (paused) videoPlayer.play()
                    if (!paused) videoPlayer.pause()
                  })
                }
              }}
              onMouseMove={() => {
                if (isPlaying) setCountDownToHideControls(5000)
              }}
              onMouseLeave={() => {
                if (isPlaying) setCountDownToHideControls(5000)
              }}
              onKeyUp={ev =>
                handleKeyUp(ev, () => {
                  if (videoPlayer) {
                    videoPlayer.getPaused().then(paused => {
                      if (paused) videoPlayer.play()
                      if (!paused) videoPlayer.pause()
                    })
                  }
                })
              }
              role="button"
              tabIndex={0}
            >
              <iframe
                title="foreword-iframe"
                ref={videoPlayerRef}
                tabIndex="-1"
                aria-hidden="true"
                src={`https://player.vimeo.com/video/447172431?controls=0`}
                width="100%"
                height="100%"
                frameBorder="0"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                allowFullScreen
                allow="autoplay; fullscreen"
                referrerPolicy="origin"
              ></iframe>
              {isLoading && (
                <div className="loading-wrap">
                  <div
                    style={{
                      transform: "translate(0, 60px)",
                      transformOrigin: "center center",
                    }}
                  >
                    <Loading size="small" />
                  </div>
                </div>
              )}
              <div
                className="control-layer"
                style={{
                  background:
                    !isPlaying || isPaused ? "rgba(0,0,0,0.2)" : "none",
                }}
              >
                {(!isPlaying || isPaused) && (
                  <div className="play-wrap">
                    <Play size="large" />
                  </div>
                )}
              </div>
            </div>
            <VideoPlayerControls
              barRef={barRef}
              isPlaying={isPlaying}
              isPaused={isPaused}
              videoPlayer={videoPlayer}
              duration={duration}
              progress={progress}
              setPause={() => {
                videoPlayer.pause()
              }}
              setPlaying={() => {
                videoPlayer.play()
              }}
              setProgress={setProgress}
              showControls={showControls}
              handleFullScreen={handleFullScreen}
              onSeek={progressSeconds => {
                videoPlayer.setCurrentTime(progressSeconds)
              }}
            />
          </div>
        </div>
      </FullScreen>
    </div>
  )
}

export default Foreword
