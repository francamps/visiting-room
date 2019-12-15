import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"
import { useStaticQuery, graphql, navigate } from "gatsby"
import Img from "gatsby-image"

import Play from "./Play"
import VideoViewedMenu from "./VideoViewedMenu"

const VideoPlayer = ({ videoSrcURL, videoTitle, ...props }) => {
  const playerRef = useRef()
  const [isPlaying, setPlaying] = useState(false)
  const [isPaused, setPause] = useState(false)
  const [isEnded, setEnded] = useState(false)

  const data = useStaticQuery(graphql`
    query MyQuery {
      file(relativePath: { eq: "TEMP/KAUNTAU.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div
      className="video"
      style={{
        marginLeft: "60px",
        width: "calc(100% - 60px)",
        position: "relative",
      }}
    >
      {isPlaying ? (
        <ReactPlayer
          ref={playerRef}
          url={videoSrcURL}
          className="react-player"
          playing={isPlaying}
          width="100%"
          height="100%"
          controls={false /* THIS DOESN'T WORK IN VIMEO */}
          onPause={() => {
            setPause(true)
          }}
          onEnded={() => {
            setEnded(true)
          }}
        />
      ) : (
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
            fluid={data.file.childImageSharp.fluid}
            style={{ width: "100%" }}
          />
        </div>
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
