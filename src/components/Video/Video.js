import React, { useState } from "react"
import { navigate } from "gatsby"

import CrossClose from "../CrossClose"
import VideoPlayer from "./VideoPlayer"
import Transcript from "./Transcript"
import { videos } from "../../content/videoRegistry"
import { videos as archive } from "../../content/archiveRegistry"

import transcriptRegistry from "../../content/transcriptRegistry"

import "./Video.css"

const Video = ({
  name,
  color,
  onClose,
  profileId,
  setView,
  isArchive,
  nextProfile,
}) => {
  const [showTranscript, setShowTranscript] = useState(false)

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
      {showTranscript && <Transcript name={name} />}
    </div>
  )
}

export default Video
