import React, { useState } from "react"
import isNull from "lodash/isNull"

import Play from "../Symbols/Play"
import Pause from "../Symbols/Pause"
import VideoFullScreenControl from "./VideoFullScreenControl"

const getStringTime = seconds => {
  return `${`${Math.floor(seconds / 60)}`.padStart(2, "0")}:${`${Math.floor(
    seconds % 60
  )}`.padStart(2, "0")}s`
}

const getLabelPositiong = (barRef, progressLabel, progress) => {
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

const getProgressFromMouse = (e, barRef, playerRef) => {
  const widthOfBar = barRef.current.getBoundingClientRect().width
  const leftOfBar = barRef.current.getBoundingClientRect().left

  const fraction = (e.clientX - leftOfBar) / widthOfBar
  const duration = playerRef.current.getDuration()

  return { progress: fraction, progressSeconds: fraction * duration }
}

const getBarWidth = (barRef, progress) => {
  if (!barRef || !barRef.current) return 0

  const widthOfBar = barRef.current.getBoundingClientRect().width
  return `${widthOfBar * progress.progress}px`
}

const onSeek = (e, barRef, playerRef, setPause, setProgress) => {
  setPause(true)
  const progressMouse = getProgressFromMouse(e, barRef, playerRef)
  setProgress(progressMouse)
  playerRef.current.seekTo(progressMouse.progress)
}

const VideoPlayerControls = ({
  barRef,
  color,
  handleFullScreen,
  isPlaying,
  isPaused,
  playerRef,
  progress,
  setPause,
  setPlaying,
  setProgress,
  showControls,

  showTranscript,
  setShowTranscript,
}) => {
  const [progressLabel, setProgressLabel] = useState(null)

  return (
    <div className={`controls ${!showControls ? "hidden" : ""}`}>
      <div className="actions">
        <div
          className="play-pause-stop"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {isPlaying && !isPaused ? (
            <div className="action-wrap">
              <Pause
                useCircle={false}
                onClick={() => {
                  setPause(true)
                }}
              />
            </div>
          ) : (
            <div className="action-wrap">
              <Play
                useCircle={false}
                onClick={() => {
                  setPause(false)
                  setPlaying(true)
                }}
              />
            </div>
          )}

          <span
            style={{
              height: "24px",
              lineHeight: "24px",
              marginRight: "12px",
              marginLeft: "5px",
              fontFamily: "GTEesti",
              textAlign: "left",
              fontSize: "var(--font-small)",
            }}
          >
            {progress.progressSeconds > 0
              ? getStringTime(progress.progressSeconds)
              : "00:00"}
          </span>
        </div>

        {playerRef && playerRef.current && (
          <>
            <div
              className="progress-seconds"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {
                null /*<span>{`${
                progress.progressSeconds
                  ? getStringTime(progress.progressSeconds)
                  : "_:_"
              } / ${getStringTime(playerRef.current.getDuration())}`}</span>*/
              }
              <span
                style={{
                  height: "24px",
                  lineHeight: "24px",
                  marginRight: "8px",
                }}
              >
                {getStringTime(playerRef.current.getDuration())}
              </span>
              {setShowTranscript && (
                <span
                  style={{
                    fontSize: "var(--font-copy)",
                    cursor: "pointer",
                    fontWeight: showTranscript ? "bold" : "light",
                    color: showTranscript
                      ? color || "var(--clr-primary)"
                      : "white",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    setShowTranscript(!showTranscript)
                  }}
                >
                  T
                </span>
              )}
              <VideoFullScreenControl
                active={handleFullScreen.active}
                onEnter={handleFullScreen.enter}
                onExit={handleFullScreen.exit}
                color={color}
              />
            </div>
          </>
        )}
      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-bg"
          ref={barRef}
          onMouseMove={e => {
            const progressMouse = getProgressFromMouse(e, barRef, playerRef)
            setProgressLabel(progressMouse)
          }}
          onMouseOut={() => {
            setProgressLabel(progress)
          }}
          onClick={e => {
            onSeek(e, barRef, playerRef, setPause, setProgress)
          }}
        />
        <div
          className="progress-bar-played"
          style={{
            width: getBarWidth(barRef, progress),
            background: color || "var(--clr-primary)",
          }}
          onClick={e => {
            onSeek(e, barRef, playerRef, setPause, setProgress)
          }}
        />
        <div
          className="progress-bar-label"
          style={{
            left: getLabelPositiong(barRef, progressLabel, progress),
          }}
        >
          {!isNull(progressLabel)
            ? getStringTime(progressLabel.progressSeconds)
            : progress.progressSeconds
            ? getStringTime(progress.progressSeconds)
            : "_:_"}
        </div>
      </div>
    </div>
  )
}

export default VideoPlayerControls
