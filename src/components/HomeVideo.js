import React from "react"
import ReactPlayer from "react-player"

// import video from "../images/video_background.mp4"
import "./HomeVideo.css"

const HomeVideo = () => {
  const items = [
    "https://vimeo.com/431067908",
    "https://vimeo.com/431067968",
    "https://vimeo.com/431068020",
    "https://vimeo.com/431068062",
  ]

  const videoSrcUrl = items[Math.floor(Math.random() * items.length)]
  console.log(videoSrcUrl)

  return (
    <div class="fullscreen-bg">
      <ReactPlayer
        url={videoSrcUrl}
        className="react-player fullscreen-bg__video"
        playing={true}
        loop
        controls="false"
        vimeoConfig={{ iframeParams: { fullscreen: 0 } }}
      />

      {
        null /*<video
        loop
        muted
        autoPlay
        //poster="img/videoframe.jpg"
        className="fullscreen-bg__video"
      >
        <source src={video} type="video/webm">
        <source src={video} type="video/mp4" />
        <source src={video} type="video/ogg">
      </video>*/
      }
    </div>
  )
}

export default HomeVideo
