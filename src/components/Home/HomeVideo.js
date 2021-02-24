import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { useMediaQuery } from "react-responsive"

import "./HomeVideo.css"

const items = ["https://player.vimeo.com/video/507870667?background=1"]

const VIDEO_DURATION = 15000

const HomeVideo = ({ setBarProgress }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const videoSkip = setInterval(() => {
      setProgress(progress => progress + 100)
      setBarProgress(
        progressFraction => progressFraction + 100 / VIDEO_DURATION
      )
    }, 100)

    return () => clearInterval(videoSkip)
  }, [])

  useEffect(() => {
    if (progress > VIDEO_DURATION) {
      navigate("/visiting-room")
    }
  }, [progress])

  return (
    <div className="fullscreen-bg ready">
      <div className="responsive-iframe-container">
        <iframe
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
