import React, { useState, useEffect, useRef } from "react"
import ReactPlayer from "react-player"
import { navigate } from "gatsby"

import "./HomeVideo.css"

const imageFilenames = ["video1A", "video1B", "video2A", "video2B"]

const items = [
  "https://vimeo.com/444204703",
  "https://vimeo.com/444204725",
  "https://vimeo.com/444204755",
  "https://vimeo.com/444204778",
]

const HomeVideo = ({ images, isShowVideo, onVideoReady, setBarProgress }) => {
  const playerRef = useRef()
  const [isReady, setReady] = useState(false)
  const [isLastTenSeconds, setIsLastTenSeconds] = useState(false)
  const [progress, setProgress] = useState({
    progress: 0,
    progressSeconds: 0,
  })
  const [videoIdx, setVideoIdx] = useState(
    Math.floor(Math.random() * items.length)
  )
  const [videoSrcUrl, setVideoSrcUrl] = useState(items[videoIdx])

  useEffect(() => {
    setVideoSrcUrl(items[videoIdx])
  }, [videoIdx])

  useEffect(() => {
    setIsLastTenSeconds(
      (playerRef.current &&
        playerRef.current.getDuration() &&
        playerRef.current.getDuration() - progress.progressSeconds < 5) ||
        false
    )
  }, [progress])

  useEffect(() => {
    if (isLastTenSeconds) {
      navigate("/visiting-room")
    }
  }, [isLastTenSeconds])

  return (
    <div className={`fullscreen-bg ${isReady && isShowVideo ? "ready" : ""}`}>
      <ReactPlayer
        ref={playerRef}
        key={`video-${videoIdx}`}
        url={videoSrcUrl}
        className="react-player fullscreen-bg__video"
        playing
        controls={false}
        config={{
          vimeo: {
            playerOptions: {
              playsinline: 1,
            },
          },
        }}
        onReady={() => {
          setReady(true)
          onVideoReady()
        }}
        onProgress={({ played, playedSeconds }) => {
          setProgress({
            progress: played,
            progressSeconds: playedSeconds,
          })
          setBarProgress(playedSeconds / (playerRef.current.getDuration() - 5))
        }}
      />
    </div>
  )
}

export default HomeVideo
