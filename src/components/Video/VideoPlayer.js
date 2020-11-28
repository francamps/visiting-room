import React, { useEffect, useState, useRef } from "react"
import ReactPlayer from "react-player"
import { FullScreen, useFullScreenHandle } from "react-full-screen"

import Play from "../Symbols/Play"
import Loading from "../Loading"
import VideoViewedMenu from "./VideoViewedMenu"
import VideoPlayerControls from "./VideoPlayerControls"

import useKeyPress from "../../utils/useKeyPressed"

import "./VideoPlayer.css"

const VideoPlayer = ({
  videoSrcURL,
  videoTitle,
  autoplay,
  name,
  color,
  onClose,
  nextProfile,
  showTranscript,
  setShowTranscript,
  isLastTenSeconds,
  progress,
  setProgress,
  playerRef,
  useTranscript,
  startTime,
}) => {
  const [isLoading, setLoading] = useState(true)
  const [isPlaying, setPlaying] = useState(false)
  const [isPaused, setPause] = useState(false)

  const [showControls, setShowControls] = useState(true)
  const [showCaptions, setShowCaptions] = useState(false)

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
    <FullScreen handle={handleFullScreen}>
      <div
        className={`video ${handleFullScreen.active ? "video-fullscreen" : ""}`}
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
                if (startTime) {
                  const duration = playerRef.current.getDuration()
                  playerRef.current.seekTo(startTime)
                  setProgress({
                    progress: startTime / duration,
                    progressSeconds: startTime,
                  })
                }
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
                if (onClose) onClose()
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
              <div className="loading-wrap">
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
        <div className="control-layer">
          {(!isPlaying || (isPlaying && isPaused)) && (
            <>
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
                  tabIndex={0}
                  onClick={() => {
                    setPause(false)
                    setPlaying(true)
                  }}
                />
              </div>
              {videoTitle && !isPaused && (
                <div
                  style={{ position: "absolute", top: "20px", left: "20px" }}
                >
                  <h2 style={{ margin: "0px", fontSize: "var(--font-large)" }}>
                    {videoTitle}
                  </h2>
                </div>
              )}
            </>
          )}
        </div>

        {isLastTenSeconds && (
          <VideoViewedMenu
            name={name}
            color={color}
            onClickReplay={() => {
              playerRef.current.seekTo(0)
              setPause(false)
              setPlaying(true)
            }}
            onClickNext={() => {
              // Do Something
            }}
            nextProfile={nextProfile}
          />
        )}
      </div>

      <VideoPlayerControls
        barRef={barRef}
        color={color}
        isPlaying={isPlaying}
        isPaused={isPaused}
        playerRef={playerRef}
        progress={progress}
        setPause={setPause}
        setPlaying={setPlaying}
        setProgress={setProgress}
        showControls={showControls}
        handleFullScreen={handleFullScreen}
        showTranscript={showTranscript}
        setShowTranscript={setShowTranscript}
        showCaptions={showCaptions}
        setShowCaptions={setShowCaptions}
        useTranscript={useTranscript}
      />
    </FullScreen>
  )
}
export default VideoPlayer
