import React, { useState } from "react"
import ReactPlayer from "react-player"

import "./HomeVideo.css"

const items = [
  "https://vimeo.com/431067908",
  "https://vimeo.com/431067968",
  "https://vimeo.com/431068020",
  "https://vimeo.com/431068062",
]

const HomeVideo = () => {
  const [isReady, setReady] = useState(false)

  const videoSrcUrl = items[Math.floor(Math.random() * items.length)]

  return (
    <div class={`fullscreen-bg ${isReady ? "ready" : ""}`}>
      <ReactPlayer
        url={videoSrcUrl}
        className="react-player fullscreen-bg__video"
        playing={true}
        loop
        controls="false"
        vimeoConfig={{ iframeParams: { fullscreen: 0 } }}
        onReady={() => {
          setReady(true)
        }}
      />
    </div>
  )
}

export default HomeVideo
