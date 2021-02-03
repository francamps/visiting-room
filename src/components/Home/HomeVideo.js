import React, { useState, useEffect, useRef } from "react"
import ReactPlayer from "react-player"
import { navigate } from "gatsby"
import { useMediaQuery } from "react-responsive"

import "./HomeVideo.css"

//import landingMp3 from "../../content/audio/landing.mp3"
//import landingOgg from "../../content/audio/landing.ogg"

const imageFilenames = ["video1A", "video1B", "video2A", "video2B"]

const items = [
  "https://player.vimeo.com/video/507870667?background=1",
  //"https://player.vimeo.com/video/503234608?background=1",
  //"https://player.vimeo.com/video/503227022?background=1",
  //"https://player.vimeo.com/video/444204755?background=1",
  //"https://player.vimeo.com/video/444204778?background=1",
]

const HomeVideo = ({ setBarProgress }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" })

  const playerRef = useRef()
  const [isReady, setReady] = useState(false)
  const [isLastTenSeconds, setIsLastTenSeconds] = useState(false)
  /*const [progress, setProgress] = useState({
    progress: 0,
    progressSeconds: 0,
  })*/
  const [progress, setProgress] = useState(0)
  const [videoIdx, setVideoIdx] = useState(
    Math.floor(Math.random() * items.length)
  )

  const VIDEO_DURATION = 14000

  /*
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
  */

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

  useEffect(() => {
    if (isLastTenSeconds) {
      navigate("/visiting-room")
    }
  }, [isLastTenSeconds])

  return (
    <div className="fullscreen-bg ready">
      <div className="responsive-iframe-container">
        <iframe
          className="responsive-iframe"
          src={items[videoIdx]}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      {/*<ReactPlayer
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
      />*/}
    </div>
  )
}

export default HomeVideo
