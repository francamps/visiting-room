import React, { useEffect, useState, useRef } from "react"

import CrossClose from "../CrossClose"
import Header from "../Header"
import VideoPlayer from "./VideoPlayer"
import Transcript from "./Transcript"

import { videos as archive } from "../../content/archiveRegistry"

import "./Video.css"

const Video = ({
  name,
  color,
  onClose,
  profileId,
  isArchive,
  nextProfile,
  hasTranscript,
  video_link,
  age_at_offense,
  current_age,
}) => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )

  const playerRef = useRef()
  const [duration, setDuration] = useState(null)
  const [showTranscript, setShowTranscript] = useState(false)
  const [isLastTenSeconds, setIsLastTenSeconds] = useState(false)
  const [progress, setProgress] = useState({
    progress: 0,
    progressSeconds: 0,
  })

  useEffect(() => {
    setIsLastTenSeconds(
      duration ? duration - progress.progressSeconds < 15 : false
    )
  }, [progress])

  return (
    <div className={`video-wrap ${showTranscript ? "transcript" : ""}`}>
      <Header
        title={name}
        actions={null}
        hideMenu
        classes="fadein"
        color={color}
      />
      <VideoPlayer
        videoSrcURL={isArchive ? archive[name] : video_link}
        videoTitle={null}
        color={color}
        onClose={onClose}
        duration={duration}
        setDuration={setDuration}
        name={name}
        age_at_offense={age_at_offense}
        current_age={current_age}
        nextProfile={nextProfile}
        isLastTenSeconds={isLastTenSeconds}
        setIsLastTenSeconds={setIsLastTenSeconds}
        profileId={profileId}
        progress={progress}
        setProgress={setProgress}
        playerRef={playerRef}
        startTime={params.get("t")}
        texttrack={params.get("texttrack")}
        hasCaptions={!isArchive}
        hasTranscript={isArchive}
        showTranscript={showTranscript}
        setShowTranscript={setShowTranscript}
      />
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 13,
        }}
        onClick={() => {
          onClose()
        }}
      >
        <CrossClose />
      </div>
      {hasTranscript && showTranscript && (
        <Transcript
          name={name}
          progress={progress}
          setProgress={setProgress}
          duration={playerRef.current && playerRef.current.getDuration()}
          playerRef={playerRef}
          setShowTranscript={setShowTranscript}
        />
      )}
    </div>
  )
}

export default Video
