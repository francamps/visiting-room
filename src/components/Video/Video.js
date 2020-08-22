import React /*, { useState }*/ from "react"
import { navigate } from "gatsby"

import CrossClose from "../CrossClose"
import VideoPlayer from "./VideoPlayer"

import { videos } from "../../content/videoRegistry"
import { videos as archive } from "../../content/archiveRegistry"

import "./Video.css"

const Video = ({ name, color, onClose, profileId, setView, isArchive }) => {
  return (
    <div className="video-wrap">
      <VideoPlayer
        videoSrcURL={isArchive ? archive[name] : videos[name]}
        videoTitle={name}
        autoplay
        color={color}
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
    </div>
  )
}

export default Video
