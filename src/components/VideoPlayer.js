import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Play from "./Play"
import VideoViewedMenu from "./VideoViewedMenu"

import "./VideoPlayer.css"

const getStringTime = seconds => {
  return `${`${Math.floor(seconds / 60)}`.padStart(2, "0")}:${`${Math.floor(
    seconds % 60
  )}`.padStart(2, "0")}s`
}

const VideoPlayer = ({ videoSrcURL, videoTitle, ...props }) => {
  const playerRef = useRef()
  const [isPlaying, setPlaying] = useState(false)
  const [isPaused, setPause] = useState(false)
  const [progress, setProgress] = useState({
    progress: 0,
    progressSeconds: 0,
  })

  const barRef = useRef()

  const query = graphql`
    query MyQuery {
      file(relativePath: { eq: "profile_pics/Kauntau_Reeder.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `

  const onSeek = e => {
    const widthOfBar = barRef.current.getBoundingClientRect().width
    const leftOfBar = barRef.current.getBoundingClientRect().left

    const fraction = (e.clientX - leftOfBar) / widthOfBar
    const duration = playerRef.current.duration

    setProgress({ progress: fraction, progressSeconds: fraction * duration })
    playerRef.current.seekTo(fraction)
  }

  const showEndCard = playerRef.current
    ? playerRef.current.getDuration() - progress.progressSeconds < 15
    : false

  return (
    <>
      <div className="video">
        {isPlaying ? (
          <ReactPlayer
            ref={playerRef}
            url={videoSrcURL}
            className="react-player"
            playing={isPlaying && !isPaused}
            width="100%"
            height="100%"
            onPause={() => {
              setPause(true)
            }}
            onEnded={() => {
              // Do something
              //setEnded(true)
            }}
            onProgress={({ played, playedSeconds }) => {
              setProgress({ progress: played, progressSeconds: playedSeconds })
            }}
          />
        ) : (
          <StaticQuery
            query={query}
            render={data => {
              const image = data.file ? data.file.childImageSharp.fluid : null
              if (image === null) return null

              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Img
                    alt={props.alt}
                    fadeIn="true"
                    fluid={image}
                    style={{ width: "100%" }}
                  />
                </div>
              )
            }}
          />
        )}
        {(!isPlaying || (isPlaying && isPaused)) && (
          <div style={{ position: "absolute" }}>
            <Play
              size="huge"
              onClick={() => {
                setPause(false)
                setPlaying(true)
              }}
            />
          </div>
        )}
        {showEndCard && (
          <VideoViewedMenu
            onClickReplay={() => {
              playerRef.current.seekTo(0)
              setPause(false)
              setPlaying(true)
            }}
            onClickNext={() => {
              // Do Something
            }}
          />
        )}
      </div>
      {isPlaying && (
        <div className="controls">
          <div className="play-pause-stop">
            {isPlaying && !isPaused ? (
              <div
                className="pause"
                onClick={() => {
                  setPause(true)
                }}
              >
                <div className="pause-tick" />
                <div className="pause-tick" />
              </div>
            ) : (
              <div className="play-wrap">
                <Play
                  onClick={() => {
                    setPause(false)
                    setPlaying(true)
                  }}
                />
              </div>
            )}
          </div>
          <div className="progress-bar" ref={barRef} onClick={onSeek}>
            <div className="progress-bar-bg" />
            <div
              className="progress-bar-played"
              style={{
                width: `${progress.progress * 100}%`,
              }}
            />
          </div>
          <div className="progress-seconds">
            <span>{getStringTime(progress.progressSeconds)}</span>
          </div>
        </div>
      )}
    </>
  )
}
export default VideoPlayer
