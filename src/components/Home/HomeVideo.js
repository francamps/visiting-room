import React, { useState, useEffect, useRef } from "react"
import ReactPlayer from "react-player"
import { navigate } from "gatsby"

import Loading from "../Loading"

import "./HomeVideo.css"

import background1A from "../../images/video1A.png"
import background1B from "../../images/video1B.png"
import background2A from "../../images/video2A.png"
import background2B from "../../images/video2B.png"

const imageFilenames = ["video1A", "video1B", "video2A", "video2B"]

const items = [
  "https://vimeo.com/444204703",
  "https://vimeo.com/444204725",
  "https://vimeo.com/444204755",
  "https://vimeo.com/444204778",
]

const bgs = [background1A, background1B, background2A, background2B]

const HomeVideo = ({ images, isShowVideo, onVideoReady }) => {
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

  const img = images.edges.find(n => {
    return n.node.relativePath === `${imageFilenames[videoIdx]}.png`
  })

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
      /*if (
        typeof window !== "undefined" &&
        window.localStorage.getItem("showIntro") === "false"
      ) {
        navigate("/visiting-room")
      } else {
        navigate("/foreword")
      }*/
    }
  }, [isLastTenSeconds])

  return (
    <div className={`fullscreen-bg ${isReady && isShowVideo ? "ready" : ""}`}>
      <ReactPlayer
        ref={playerRef}
        key={`video-${videoIdx}`}
        url={videoSrcUrl}
        className="react-player fullscreen-bg__video"
        playing={isReady && isShowVideo ? true : false}
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
        }}
      />
    </div>
  )
}

export default HomeVideo
