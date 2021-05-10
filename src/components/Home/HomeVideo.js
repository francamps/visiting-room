import React, { useRef, useState, useEffect } from "react"
import { navigate } from "gatsby"
import Player from "@vimeo/player"

import "./HomeVideo.css"

const items = [
  "https://player.vimeo.com/video/507870667?background=1",
  "https://player.vimeo.com/video/516540255?background=1",
  "https://player.vimeo.com/video/516543730?background=1",
  "https://player.vimeo.com/video/516547387?background=1",
]

const HomeVideo = ({ setBarProgress }) => {
  const [videoSrc] = useState(items[Math.floor(items.length * Math.random())])
  const [videoPlayer, setVideoPlayer] = useState(null)
  const videoPlayerRef = useRef()

  useEffect(() => {
    if (videoPlayerRef && videoPlayerRef.current) {
      try {
        const player = new Player(videoPlayerRef.current, {
          autoplay: 1,
          controls: false,
          title: false,
          muted: 1,
        })

        player.on("timeupdate", ({ percent, seconds }) => {
          setBarProgress(percent)

          //if (percent > 0.9) navigate("/visiting-room")
        })
        setVideoPlayer(videoPlayer)
      } catch (e) {
        console.log(e, videoPlayerRef, videoSrc)
      }
    }
  }, [videoPlayerRef.current])

  return (
    <div className="fullscreen-bg ready">
      <div className="responsive-iframe-container">
        <iframe
          title="homevideo-iframe"
          ref={videoPlayerRef}
          className="responsive-iframe"
          src={videoSrc}
          data-src={videoSrc}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          referrerPolicy="origin"
          referrer-policy="origin"
        ></iframe>
      </div>
    </div>
  )
}

export default HomeVideo
