import React, { useEffect, useState, useRef } from "react"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import isNull from "lodash/isNull"
import Player from "@vimeo/player"

import Play from "../Symbols/Play"
import Loading from "../Loading"
import VideoViewedMenu from "./VideoViewedMenu"
import VideoPlayerControls from "./VideoPlayerControls"

import useKeyPress from "../../utils/useKeyPressed"
import { handleKeyUp } from "../../utils"

import "./VideoPlayer.css"

const VideoPlayer = ({
  videoSrcURL,
  name,
  age_at_offense,
  current_age,
  color,
  duration,
  nextProfile,
  showTranscript,
  setDuration,
  setShowTranscript,
  isLastTenSeconds,
  progress,
  setProgress,
  texttrack,
  hasTranscript,
  hasCaptions,
  startTime,
  profileId,
}) => {
  const [isLoading, setLoading] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const [isPaused, setPause] = useState(false)
  const [videoPlayer, setVideoPlayer] = useState(null)
  const [showControls, setShowControls] = useState(true)
  const [showCaptions, setShowCaptions] = useState(texttrack)

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
          texttrack: showCaptions,
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
        if (startTime) videoPlayer.setCurrentTime(startTime)
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

  useEffect(() => {
    if (videoPlayer) {
      if (showCaptions) {
        videoPlayer.getTextTracks().then(tracks => {
          videoPlayer.enableTextTrack(tracks[0].language)
        })
      } else {
        videoPlayer.disableTextTrack()
      }
    }
  }, [showCaptions])

  const getUrl = videoSrcURL => {
    if (videoSrcURL) {
      try {
        return videoSrcURL.split("https://vimeo.com/")[1]
      } catch {
        return videoSrcURL.split("/archive/")[1]
      }
    }
  }

  return (
    <FullScreen handle={handleFullScreen}>
      <div
        className={`video ${handleFullScreen.active ? "video-fullscreen" : ""}`}
        onClick={() => {
          if (videoPlayer) {
            videoPlayer.getPaused().then(paused => {
              if (paused) videoPlayer.play()
              if (!paused) videoPlayer.pause()
            })
          }
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
        onMouseMove={() => {
          if (isPlaying) setCountDownToHideControls(5000)
        }}
        onMouseLeave={() => {
          if (isPlaying) setCountDownToHideControls(5000)
        }}
        role="button"
        tabIndex="0"
      >
        <iframe
          title="main-videoplayer-iframe"
          ref={videoPlayerRef}
          tabIndex="-1"
          aria-hidden="true"
          src={`https://player.vimeo.com/video/${getUrl(
            videoSrcURL
          )}?controls=0${startTime ? "#t=" + startTime : ""}`}
          width="100%"
          height="100%"
          frameBorder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          texttrack={"en-US"}
          allow="autoplay; fullscreen"
          referrerpolicy="origin"
        ></iframe>

        {isLoading && (
          <div className="loading-wrap">
            <div
              style={{
                transform: "translate(0, 80px)",
                transformOrigin: "center center",
              }}
            >
              <Loading color={color} />
            </div>
          </div>
        )}
        <div className="control-layer">
          {(!isPlaying || isPaused) && (
            <>
              <div className="play-wrap">
                <Play size="large" tabIndex={0} />
              </div>
            </>
          )}
        </div>

        {// We no longer want to final updated card
        // to be visible, we'll go with the one in the video
        isLastTenSeconds && (
          <VideoViewedMenu
            name={name}
            age_at_offense={age_at_offense}
            current_age={current_age}
            color={color}
            onClickReplay={() => {
              videoPlayer.setCurrentTime(0)
              videoPlayer.play()
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
        duration={duration}
        isPlaying={isPlaying}
        isPaused={isPaused}
        videoPlayer={videoPlayer}
        profileId={profileId}
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
        hasTranscript={hasTranscript}
        showTranscript={showTranscript}
        setShowTranscript={setShowTranscript}
        hasCaptions={hasCaptions}
        showCaptions={showCaptions}
        setShowCaptions={setShowCaptions}
        onSeek={progressSeconds => {
          videoPlayer.setCurrentTime(progressSeconds)
        }}
      />
    </FullScreen>
  )
}
export default VideoPlayer
