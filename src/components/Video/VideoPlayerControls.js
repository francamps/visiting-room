import React, { useState } from "react"
import isNull from "lodash/isNull"
import { navigate } from "gatsby"

import Play from "../Symbols/Play"
import Pause from "../Symbols/Pause"
import IconTranscript from "../Symbols/Transcript"
import IconCaption from "../Symbols/Caption"
import VideoFullScreenControl from "./VideoFullScreenControl"

import { handleKeyUp } from "../../utils"
import { noop } from "lodash"

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

const getProgressFromMouse = (e, barRef, duration) => {
  if (!barRef || !barRef.current) return { progress: 0, progressSeconds: 0 }

  const widthOfBar = barRef.current.getBoundingClientRect().width
  const leftOfBar = barRef.current.getBoundingClientRect().left

  const fraction = (e.clientX - leftOfBar) / widthOfBar

  return { progress: fraction, progressSeconds: fraction * duration }
}

const getBarWidth = (barRef, progress) => {
  if (!barRef || !barRef.current) return 0

  const widthOfBar = barRef.current.getBoundingClientRect().width
  return `${widthOfBar * progress.progress}px`
}

const onSeek = (e, barRef, duration, setProgress) => {
  const progressMouse = getProgressFromMouse(e, barRef, duration)
  setProgress(progressMouse)
}

const VideoPlayerControls = ({
  barRef,
  color,
  duration,
  hasCaptions,
  hasTranscript,
  handleFullScreen,
  isPlaying,
  isPaused,
  progress,
  setPause,
  setPlaying,
  setProgress,
  setShowCaptions,
  setShowTranscript,
  showTranscript,
  showControls,
  showCaptions,
  videoPlayer,
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
                tabIndex={0}
                onClick={() => {
                  videoPlayer.pause()
                  setPause(true)
                }}
              />
            </div>
          ) : (
            <div className="action-wrap">
              <Play
                useCircle={false}
                tabIndex={0}
                onClick={() => {
                  videoPlayer.play()
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
              fontFamily: "Roboto",
              textAlign: "left",
              fontSize: "var(--font-small)",
            }}
          >
            {progress.progressSeconds > 0
              ? getStringTime(progress.progressSeconds)
              : "00:00"}
          </span>
        </div>

        {videoPlayer && (
          <>
            <div
              className="progress-seconds"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  height: "24px",
                  lineHeight: "24px",
                  marginRight: "8px",
                }}
              >
                {getStringTime(duration)}
              </span>
              {hasTranscript && setShowTranscript && (
                <span
                  role="button"
                  tabIndex={2}
                  ariaLabel={
                    showTranscript ? "Hide transcript" : "Show transcript"
                  }
                  style={{
                    cursor: "pointer",
                    paddingRight: "10px",
                  }}
                  onKeyUp={ev =>
                    handleKeyUp(ev, () => setShowTranscript(!showTranscript))
                  }
                  onClick={() => {
                    setShowTranscript(!showTranscript)
                  }}
                >
                  <IconTranscript
                    color={
                      showTranscript ? color || "var(--clr-primary)" : "white"
                    }
                  />
                </span>
              )}
              {hasCaptions && (
                <span
                  role="button"
                  tabIndex={3}
                  ariaLabel={showCaptions ? "Hide captions" : "Show captions"}
                  style={{
                    cursor: "pointer",
                    paddingRight: "10px",
                  }}
                  onKeyUp={ev =>
                    handleKeyUp(ev, () =>
                      setShowCaptions(!showCaptions ? "en-US" : null)
                    )
                  }
                  onClick={() => {
                    setShowCaptions(!showCaptions)
                  }}
                >
                  <IconCaption
                    color={
                      showCaptions ? color || "var(--clr-primary)" : "white"
                    }
                  />
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
          role="button"
          aria-label="Seek time in video"
          onMouseMove={e => {
            const progressMouse = getProgressFromMouse(e, barRef, duration)
            setProgressLabel(progressMouse)
          }}
          onMouseOut={() => {
            setProgressLabel(progress)
          }}
          onBlur={() => {
            setProgressLabel(progress)
          }}
          onKeyUp={ev => handleKeyUp(ev, noop)}
          onClick={e => {
            onSeek(e, barRef, duration, setProgress)
          }}
        />
        <div
          className="progress-bar-played"
          role="button"
          aria-label="Seek time in past video played"
          style={{
            width: getBarWidth(barRef, progress),
            background: color || "var(--clr-primary)",
          }}
          onKeyUp={ev => handleKeyUp(ev, noop)}
          onClick={e => {
            onSeek(e, barRef, duration, setProgress)
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
