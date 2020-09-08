import React, { useState, useEffect } from "react"
import ReactPlayer from "react-player"
import Img from "gatsby-image"

import Loading from "../Loading"

import "./HomeVideo.css"

import background1A from "../../images/video1A.png"
import background1B from "../../images/video1B.png"
import background2A from "../../images/video2A.png"
import background2B from "../../images/video2B.png"

const imageFilenames = ["video1A", "video1B", "video2A", "video2B"]

const items = [
  "https://vimeo.com/444204703",
  "https://vimeo.com/444204725",
  "https://vimeo.com/444204755",
  "https://vimeo.com/444204778",
]

const bgs = [background1A, background1B, background2A, background2B]

const HomeVideo = ({ images, setMenuExpanded }) => {
  const [isReady, setReady] = useState(false)
  const [videoIdx, setVideoIdx] = useState(
    Math.floor(Math.random() * items.length)
  )
  const [videoSrcUrl, setVideoSrcUrl] = useState(items[videoIdx])

  useEffect(() => {
    setVideoSrcUrl(items[videoIdx])
  }, [videoIdx])

  const img = images.edges.find(n => {
    return n.node.relativePath === `${imageFilenames[videoIdx]}.png`
  })

  return (
    <div
      className={`fullscreen-bg ${isReady ? "ready" : ""}`}
      onClick={() => {
        setMenuExpanded(true)
      }}
      style={{
        background: `url(${bgs[videoIdx]})`,
      }}
    >
      <Img
        alt={"TODO: NEEDS AN ALT"}
        fluid={img.node.childImageSharp.fluid}
        imgStyle={{
          objectFit: "cover",
        }}
      />
      <ReactPlayer
        key={`video-${videoIdx}`}
        url={videoSrcUrl}
        className="react-player fullscreen-bg__video"
        playing={true}
        controls={false}
        muted={true}
        config={{
          file: {
            attributes: {
              poster: "../../images/WALTER_6.jpg",
            },
          },
          vimeo: {
            playerOptions: {
              playsinline: 1,
              muted: 1,
              autoplay: 1,
            },
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
