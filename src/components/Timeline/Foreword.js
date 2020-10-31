import React, { useEffect, useState, useRef } from "react"
import ReactPlayer from "react-player"
import { navigate } from "gatsby"
import { FullScreen, useFullScreenHandle } from "react-full-screen"

import Play from "../Symbols/Play"
import Loading from "../Loading"
import VideoPlayerControls from "../Video/VideoPlayerControls"
import useKeyPress from "../../utils/useKeyPressed"

import "./Foreword.css"

const videoSrcURL = "https://vimeo.com/444511449"

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
  const handleFullScreen = useFullScreenHandle()
  const spacePress = useKeyPress(32)
  const escPress = useKeyPress(27)

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

  useEffect(() => {
    if (!isPlaying) {
      setPlaying(true)
      setPause(false)
    }
    if (isPlaying) {
      setPause(!isPaused)
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
                  <div className="loading-wrap">
                    <Loading />
                  </div>
                )}
              </>
            )}
            <div
              className="control-layer"
              style={{
                background: !isPlaying || isPaused ? "rgba(0,0,0,0.2)" : "none",
              }}
            >
              {(!isPlaying || (isPlaying && isPaused)) && (
                <div
                  className="play-wrap"
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
          <VideoPlayerControls
            barRef={barRef}
            isPlaying={isPlaying}
            isPaused={isPaused}
            playerRef={playerRef}
            progress={progress}
            setPause={setPause}
            setPlaying={setPlaying}
            setProgress={setProgress}
            showControls={showControls}
            handleFullScreen={handleFullScreen}
          />
        </div>
      </div>
    </FullScreen></div>
  )
}

export default Foreword
