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
  const [isEnded, setEnded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressSeconds, setProgressSeconds] = useState(0)

  const barRef = useRef()

  const query = graphql`
    query MyQuery {
      file(relativePath: { eq: "TEMP/profile_pics/Kauntau_Reeder.jpg" }) {
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

    setProgress(fraction)
    setProgressSeconds(fraction * duration)
    playerRef.current.seekTo(fraction)
  }

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
              setEnded(true)
            }}
            onProgress={({ played, playedSeconds }) => {
              setProgress(played)
              setProgressSeconds(playedSeconds)
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
        {isEnded && (
          <VideoViewedMenu
            onClickReplay={() => {
              playerRef.current.seekTo(0)
              setEnded(false)
              setPause(false)
              setPlaying(true)
            }}
            onClickNext={() => {
              // Do Something
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
                width: `${progress * 100}%`,
              }}
            />
          </div>
          <div className="progress-seconds">
            <span>{getStringTime(progressSeconds)}</span>
          </div>
        </div>
      )}
    </>
  )
}
export default VideoPlayer
