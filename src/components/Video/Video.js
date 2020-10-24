import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"

import CrossClose from "../CrossClose"
import VideoPlayer from "./VideoPlayer"
import Transcript from "./Transcript"
import { videos } from "../../content/videoRegistry"
import { videos as archive } from "../../content/archiveRegistry"

import "./Video.css"

const Video = ({
  name,
  color,
  onClose,
  profileId,
  setView,
  isArchive,
  nextProfile,
  useTranscript,
}) => {
  const playerRef = useRef()
  const [showTranscript, setShowTranscript] = useState(false)
  const [isLastTenSeconds, setIsLastTenSeconds] = useState(false)
  const [progress, setProgress] = useState({
    progress: 0,
    progressSeconds: 0,
  })

  useEffect(() => {
    setIsLastTenSeconds(
      playerRef.current && playerRef.current.getDuration()
        ? playerRef.current.getDuration() - progress.progressSeconds < 15
        : false
    )
  }, [progress])

  return (
    <div className={`video-wrap ${showTranscript ? "transcript" : ""}`}>
      <VideoPlayer
        videoSrcURL={isArchive ? archive[name] : videos[name]}
        videoTitle={name}
        autoplay
        color={color}
        onClose={onClose}
        name={name}
        nextProfile={nextProfile}
        showTranscript={showTranscript}
        setShowTranscript={setShowTranscript}
        isLastTenSeconds={isLastTenSeconds}
        setIsLastTenSeconds={setIsLastTenSeconds}
        progress={progress}
        setProgress={setProgress}
        playerRef={playerRef}
        useTranscript={useTranscript}
      />
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
        }}
        onClick={() => {
          onClose()
        }}
      >
        <CrossClose />
      </div>
      {useTranscript && showTranscript && (
        <Transcript
          name={name}
          progress={progress}
          setProgress={setProgress}
          duration={playerRef.current && playerRef.current.getDuration()}
          playerRef={playerRef}
        />
      )}
    </div>
  )
}

export default Video
