import React, { useState, useEffect } from "react"
import ReactPlayer from "react-player"

import "./HomeVideo.css"

const items = [
  "https://vimeo.com/444204703",
  "https://vimeo.com/444204725",
  "https://vimeo.com/444204755",
  "https://vimeo.com/444204778",
]

const HomeVideo = ({ setMenuExpanded }) => {
  const [isReady, setReady] = useState(false)
  const [videoIdx, setVideoIdx] = useState(
    Math.floor(Math.random() * items.length)
  )
  const [videoSrcUrl, setVideoSrcUrl] = useState(items[videoIdx])

  useEffect(() => {
    setVideoSrcUrl(items[videoIdx])
  }, [videoIdx])

  return (
    <div
      className={`fullscreen-bg ${isReady ? "ready" : ""}`}
      onClick={() => {
        console.log("click happening")
        setMenuExpanded(true)
      }}
    >
      <ReactPlayer
        key={`video-${videoIdx}`}
        url={videoSrcUrl}
        className="react-player fullscreen-bg__video"
        playing={true}
        controls={false}
        config={{
          vimeo: {
            iframeParams: { fullscreen: 0 },
            autoplay: true,
            playsinline: true,
          },
        }}
        onReady={() => {
          setReady(true)
        }}
        onEnded={() => {
          setReady(false)
          setVideoIdx(videoIdx === items.length - 1 ? 0 : videoIdx + 1)
        }}
      />
    </div>
  )
}

export default HomeVideo
