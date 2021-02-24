import React, { useRef, useState, useEffect } from "react"
import { navigate } from "gatsby"
import Player from "@vimeo/player"

import "./HomeVideo.css"

const items = ["https://player.vimeo.com/video/507870667?background=1"]

const HomeVideo = ({ setBarProgress }) => {
  const [progress, setProgress] = useState(0)
  const [videoPlayer, setVideoPlayer] = useState(null)
  const videoPlayerRef = useRef()

  useEffect(() => {
    if (videoPlayerRef && videoPlayerRef.current) {
      const player = new Player(videoPlayerRef.current, {
        autoplay: 1,
        controls: false,
        title: false,
        muted: 1,
      })

      player.on("timeupdate", ({ percent, seconds }) => {
        setProgress(seconds)
        setBarProgress(percent)

        if (percent > 0.9) navigate("/visiting-room")
      })
      setVideoPlayer(videoPlayer)
    }
  }, [videoPlayerRef.current])

  return (
    <div className="fullscreen-bg ready">
      <div className="responsive-iframe-container">
        <iframe
          ref={videoPlayerRef}
          className="responsive-iframe"
          src={items[0]}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          referrerpolicy="origin"
        ></iframe>
      </div>
    </div>
  )
}

export default HomeVideo
