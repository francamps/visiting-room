import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Play from "./Play"
import VideoViewedMenu from "./VideoViewedMenu"

const VideoPlayer = ({ videoSrcURL, videoTitle, ...props }) => {
  const playerRef = useRef()
  const [isPlaying, setPlaying] = useState(false)
  const [isPaused, setPause] = useState(false)
  const [isEnded, setEnded] = useState(false)
  const [progress, setProgress] = useState(0)

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

  return (
    <div
      className="video"
      style={{
        marginLeft: "60px",
        width: "calc(100% - 60px)",
        position: "relative",
      }}
    >
      {true ? (
        <>
          <Play />
          <ReactPlayer
            ref={playerRef}
            url={videoSrcURL}
            className="react-player"
            playing={isPlaying}
            width="100%"
            height="100%"
            onPause={() => {
              setPause(true)
            }}
            onEnded={() => {
              setEnded(true)
            }}
            onProgress={({ played }) => {
              setProgress(played)
            }}
          />
          <div
            className="progress-bar"
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
          >
            <div
              style={{
                width: "100%",
                height: "10px",
                background: "white",
                position: "absolute",
              }}
            />
            <div
              style={{
                width: `${progress * 100}%`,
                height: "10px",
                background: "var(--clr-primary",
                position: "absolute",
                transition: "width 1s linear",
              }}
            />
          </div>
        </>
      ) : (
        <StaticQuery
          query={query}
          render={data => {
            console.log(data)
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
              setPlaying(true)
            }}
          />
        </div>
      )}
    </div>
  )
}
export default VideoPlayer
