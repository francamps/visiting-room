import React, { useEffect, useRef, useState } from "react"
import { navigate } from "gatsby"
import { useInView } from "react-intersection-observer"
import { useMediaQuery } from "react-responsive"
import Player from "@vimeo/player"

import GridCellBackground from "./GridCellBackground"
import IconSound from "./Symbols/Sound"
import Play from "./Symbols/Play"
import MenuButton from "./MenuButton"

import "./GridCell.css"

import { getNameUri } from "../utils/index.js"

const videosBackground = {
  "Alvin Catchings": "516108298",
  "Arthur Carter": "516109009",
  "Archie Tyner": "516108593",
  "Anthony Hingle": "516108451",
  "Darnell Craft": "508706478",
  "Darwin Willie": "508706826",
  "Daryl Waters": "508706916",
  "David Chenevert": "508707348",
  "Donahue Smith": "508707599",
  "Edbert Simmons": "508707735",
  "Frank Green": "508708389",
  "Gordon Newman": "508708572",
  "Hannibal Stanfield": "508708762",
  "Hayward Jones": "508709415",
  "Bernell Juluke": "516109257",
  "Jack Segura": "508723795",
  "Jarred Lanclow": "508723981",
  "Jeffrer Hillburn": "508724273",
  "Jimmy Robinson": "508724877",
  "Jeffrey Nelson": "508725427",
  "Jerome Derricks": "508731944",
  "Kenneth Woodburn": "508734399",
  "Nadaedrick Campbell": "508737335",
  "Kauntau Reeder": "508739814",
  "Kendrick Fisher": "508746564",
  "Lawson Strickland": "505848783",
  "Patrick Johnson": "505849026",
  "Patrick Lucien": "505851302",
  "Raymond Flank": "505851528",
  "Sammie Robinson": "505853849",
  "Terrence Guy": "505856192",
  "Terry Pierce": "505858769",
  "Terry West": "505861255",
  "Theortric Givens": "505863367",
  "Vashon Kelly": "505863627",
  "Walter Goodwin": "505863920",
  "Walter Reed": "505866295",
}
Object.entries(videosBackground).forEach(
  ([name, id]) =>
    (videosBackground[name] = `https://player.vimeo.com/video/${id}?controls=0`)
)

const getColor = hex => {
  if (hex.slice(0, 1) === "#") {
    return `clr-${hex.slice(1)}`
  }
}

const GridCell = ({
  image,
  profile_picture,
  quote,
  fullName,
  color,
  video_link,
}) => {
  const [isHover, setHover] = useState(false)
  const [isSound, setSound] = useState(0)
  const [videoPlayer, setVideoPlayer] = useState(null)

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.5,
  })
  const profileUri = getNameUri(fullName)
  const videoPlayerRef = useRef()

  const isHoverOrInView =
    (isHover && videosBackground[fullName]) ||
    (isTabletOrMobile && inView && videosBackground[fullName])

  useEffect(() => {
    if (isHoverOrInView && !videoPlayer) {
      const player = new Player(videoPlayerRef.current, {
        autoplay: 1,
        controls: false,
        title: false,
        muted: 1,
        loop: 1,
      })
      setVideoPlayer(player)
    } else if (!isHoverOrInView && videoPlayer) {
      //      videoPlayer.destroy()
      setVideoPlayer(null)
    }
  }, [isHoverOrInView])

  useEffect(() => {
    if (videoPlayer && videoPlayer.setVolume) {
      try {
        videoPlayer.setVolume(0)
        videoPlayer.play()
        videoPlayer.setLoop(true)
      } catch (e) {
        console.log(e)
      }
    }
  }, [videoPlayer])

  useEffect(() => {
    if (isHoverOrInView && videoPlayer) {
      const videoVolume = setInterval(() => {
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
      }, 100)

      return () => clearInterval(videoVolume)
    }
  }, [isSound])

  if (!image) {
    return null
  }

  return (
    <div
      className={`grid-cell ${
        isHover || (isTabletOrMobile && inView) ? "hovered" : ""
      }`}
      ref={ref}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      {image && <GridCellBackground isHover={isHoverOrInView} image={image} />}
      {isHoverOrInView && (
        <div
          className={`responsive-iframe-container ${(isHover ||
            (isTabletOrMobile && inView)) &&
            "visible"}`}
        >
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
        <div className="cell-hover-quote">
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
      >
        <div
          className={`svg-wrapper ${isHoverOrInView ? "hovered" : ""}`}
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
                  opacity: isHoverOrInView ? 1 : 0,
                  transition: "opacity 1.2s",
                }}
              >
                <Play color={"var(--clr-black)"} />
              </div>
            )}
            <div className="text">{fullName}</div>
          </div>
        </div>
        {
          <div
            className={`menu-buttons ${isHoverOrInView ? "fadein" : ""}`}
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
        }
      </h3>
    </div>
  )
}

export default GridCell
