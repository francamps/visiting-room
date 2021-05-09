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

const videoIds = {
  "Alvin Catchings": "516108298",
  "Arthur Carter": "516109009",
  "Archie Tyner": "516108593",
  "Anthony Hingle": "516108451",
  "Darnell Craft": "517980917",
  "Darwin Willie": "517988900",
  "Daryl Waters": "517989309",
  "David Chenevert": "517981393",
  "Donahue Smith": "517981262",
  "Edbert Simmons": "517988762",
  "Frank Green": "517990233",
  "Gordon Newman": "518003049",
  "Hannibal Stanfield": "518003202",
  "Hayward Jones": "518003308",
  "Bernell Juluke": "516109257",
  "Jack Segura": "518005411",
  "Jarrod Lanclow": "518004516",
  "Jeffrey Hilburn": "518009857",
  "Jimmy Robinson": "518016475",
  "Jeffrey Nelson": "518011651",
  "Jerome Derricks": "518010053",
  "Kenneth Woodburn": "518494582",
  "Kuantau Reeder": "518016879",
  "Nadaedrick Campbell": "518495701",
  "Kendrick Fisher": "518493892",
  "Lawson Strickland": "518495160",
  "Patrick Johnson": "518495860",
  "Patrick Lucien": "518494148",
  "Raymond Flank": "518498471",
  "Sammie Robinson": "518502265",
  "Terrence Guy": "518503459",
  "Terry Pierce": "518505298",
  "Terry West": "518508684",
  "Theortric Givens": "518508068",
  "Vashon Kelly": "518510058",
  "Walter Goodwin": "518510529",
  "Walter Reed": "518513628",
}

const getColor = hex => {
  if (hex.slice(0, 1) === "#") {
    return `clr-${hex.slice(1)}`
  }
}

const GridCellDesktop = ({
  image,
  quote,
  fullName,
  color,
  video_link,
  isSoundEnabled,
  videosBackground,
  isLoadBackgrounds,
}) => {
  const [isHover, setHover] = useState(false)
  const [isSound, setSound] = useState(0)
  const [videoPlayer, setVideoPlayer] = useState(null)

  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.1,
  })
  const profileUri = getNameUri(fullName)
  const videoPlayerRef = useRef()

  useEffect(() => {
    if (isHover && inView && !videoPlayer) {
      try {
        const player = new Player(videoPlayerRef.current, {
          autoplay: 1,
          autopause: false,
          controls: false,
          title: false,
          loop: 1,
        })
        setVideoPlayer(player)
        if (!isSoundEnabled) player.setVolume(0)
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
        setVideoPlayer(null)
      } catch (e) {
        console.warn("Video not available")
      }
    }
  }, [inView, isHover, videoPlayer])

  useEffect(() => {
    if (inView && videoPlayer && videoPlayer.getVolume) {
      const videoVolume = setInterval(() => {
        if (inView && videoPlayer && !!videoPlayerRef.current) {
          videoPlayer
            .ready()
            .then(() => {
              videoPlayer.getVolume().then(vol => {
                if (isSound && vol < 1) {
                  videoPlayer.setVolume(vol + 0.1)
                }
                if (!isSound && vol > 0) {
                  videoPlayer.setVolume(vol - 0.1)
                }
              })
            })
            .catch(e => {
              console.warn("Player is not available.")
            })
        }
      }, 100)

      return () => clearInterval(videoVolume)
    }
  }, [isSound])

  useEffect(
    () => {
      return () => {
        if (videoPlayer && videoPlayer.destroy)
          videoPlayer.destroy().then(() => {
            setVideoPlayer(null)
          })
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    []
  )

  useEffect(() => {
    if ((!isHover || !inView) && videoPlayer && videoPlayer.destroy) {
      videoPlayer.destroy().then(() => {
        setVideoPlayer(null)
      })
    }
  }, [isHover, inView])

  if (!image) {
    return null
  }

  return (
    <div
      className={`grid-cell fadeinfast ${isHover ? "hovered" : ""}`}
      ref={ref}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      {image && <GridCellBackground isHover={isHover} image={image} />}
      {isHover && inView && isLoadBackgrounds && (
        <div className={`responsive-iframe-container ${isHover && "visible"}`}>
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
          role="link"
          tabIndex={0}
        >
          {!video_link || !video_link.url ? (
            <p style={{ opacity: 0.8 }}>Profile not available yet.</p>
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
        role="link"
      >
        <div
          className={`svg-wrapper ${isHover && "hovered"}`}
          style={{
            background: `var(--${getColor(color)}`,
          }}
        >
          <div className="name-wrap">
            <div className="name-play">
              <Play color={"var(--clr-black)"} />
            </div>
            <div className="text">{fullName}</div>
          </div>
        </div>
        <div
          className={`menu-buttons ${isHover && !isSoundEnabled && "fadein"}`}
          style={{
            position: "absolute",
            top: "auto",
            bottom: "20px",
            opacity: 0,
          }}
        >
          <MenuButton
            onTouchStart={e => {
              e.stopPropagation()
              setSound(1)
            }}
            onMouseDown={e => {
              e.stopPropagation()
              setSound(1)
            }}
            onMouseUp={e => {
              e.stopPropagation()
              setSound(0)
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

export default GridCellDesktop
