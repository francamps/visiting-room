import React, { useEffect, useRef, useState } from "react"
import { navigate } from "gatsby"
import { useInView } from "react-intersection-observer"
import Player from "@vimeo/player"

import GridCellBackground from "./GridCellBackground"
import IconSound from "./Symbols/Sound"
import Play from "./Symbols/Play"
import MenuButton from "./MenuButton"

import "./GridCell.css"

import { getNameUri } from "../utils/index.js"
import { handleKeyUp } from "../utils"

const getColor = hex => {
  if (hex.slice(0, 1) === "#") {
    return `clr-${hex.slice(1)}`
  }
}

const GridCellMobile = ({
  image,
  quote,
  fullName,
  color,
  video_link,
  videosBackground,
}) => {
  const [isSound, setSound] = useState(0)
  const [videoPlayer, setVideoPlayer] = useState(null)

  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.1,
  })
  const profileUri = getNameUri(fullName)
  const videoPlayerRef = useRef()

  useEffect(() => {
    if (inView && !videoPlayer) {
      try {
        const player = new Player(videoPlayerRef.current, {
          autoplay: 1,
          controls: false,
          title: false,
          muted: 1,
          loop: 1,
        })
        setVideoPlayer(player)
        player.setVolume(0)
        player.setAutopause(false)
        player.setLoop(true)
        player
          .play()
          .then(() => {})
          .catch(error => {
            console.warn(error)
          })
      } catch (e) {
        console.warn("Video not available")
      }
    } else if (!inView && videoPlayer) {
      try {
        //videoPlayer.destroy()
        setVideoPlayer(null)
      } catch (e) {
        console.warn("Video not available")
      }
    } else if (inView && videoPlayer && videoPlayer.setVolume) {
      try {
        videoPlayer.setVolume(0)
        videoPlayer.setCurrentTime(0)
        videoPlayer.play()
      } catch (e) {
        console.warn(e)
      }
    }
  }, [inView, videoPlayer])

  useEffect(() => {
    if (inView && videoPlayer) {
      const videoVolume = setInterval(() => {
        try {
          if (videoPlayer) {
            videoPlayer.getVolume().then(vol => {
              if (isSound && vol < 1) {
                videoPlayer.setVolume(vol + 0.1)
              }
              if (!isSound && vol > 0) {
                videoPlayer.setVolume(vol - 0.1)
              }
            })
          }
        } catch (e) {
          console.warn("Player is not available.")
        }
      }, 100)

      return () => clearInterval(videoVolume)
    }
  }, [isSound])

  useEffect(() => {
    return () => {
      if (videoPlayer && videoPlayer.destroy) videoPlayer.destroy()
    }
  }, [])

  if (!image) {
    return null
  }

  return (
    <div className={`grid-cell ${inView && "hovered"}`} ref={ref}>
      {image && <GridCellBackground isHover={inView} image={image} />}
      {inView && (
        <div className={`responsive-iframe-container ${inView && "visible"}`}>
          <iframe
            ref={videoPlayerRef}
            title={fullName}
            className="responsive-iframe"
            src={videosBackground[fullName]}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="origin"
          ></iframe>
        </div>
      )}
      <div className="cell-hover-layer"></div>
      {quote && (
        <div
          className="cell-hover-quote"
          onClick={() => {
            video_link &&
              video_link.url &&
              navigate(`/visiting-room/${profileUri}`)
          }}
          onKeyUp={ev =>
            handleKeyUp(ev, () => {
              video_link &&
                video_link.url &&
                navigate(`/visiting-room/${profileUri}`)
            })
          }
        >
          {!video_link || !video_link.url ? (
            <p style={{ opacity: 0.8 }}>Interview not available.</p>
          ) : null}
          <div className={`quote ${getColor(color)}`}>
            <span>{`"${quote}"`}</span>
          </div>
        </div>
      )}
      <h3
        className="name-tag"
        onClick={() => {
          video_link &&
            video_link.url &&
            navigate(`/visiting-room/${profileUri}`)
        }}
        onKeyUp={ev =>
          handleKeyUp(ev, () => {
            video_link &&
              video_link.url &&
              navigate(`/visiting-room/${profileUri}`)
          })
        }
      >
        <div
          className={`svg-wrapper ${inView && "hovered"}`}
          style={{
            background: `var(--${getColor(color)}`,
          }}
        >
          <div className="name-wrap">
            {video_link && video_link.url && (
              <div
                className="name-play"
                style={{
                  width: "auto",
                  opacity: inView,
                  transition: "opacity 1.2s",
                }}
              >
                <Play color={"var(--clr-black)"} />
              </div>
            )}
            <div className="text">{fullName}</div>
          </div>
        </div>
        <div
          className={`menu-buttons ${inView && "fadein"}`}
          style={{
            position: "absolute",
            bottom: 0,
            opacity: 0,
          }}
        >
          <MenuButton
            onMouseDown={e => {
              e.stopPropagation()
              setSound(1)
            }}
            onMouseUp={e => {
              e.stopPropagation()
              setSound(0)
            }}
            onTouchStart={e => {
              e.stopPropagation()
              setSound(1)
            }}
            onTouchEnd={e => {
              e.stopPropagation()
              setSound(0)
            }}
            onClick={e => {
              e.stopPropagation()
            }}
            buttonContent={<IconSound />}
            tooltipContent={"Hold to listen"}
            tooltipStyling={{
              background: `var(--${getColor(color)}`,
              fontSize: "var(--font-small)",
            }}
          />
        </div>
      </h3>
    </div>
  )
}

export default GridCellMobile
