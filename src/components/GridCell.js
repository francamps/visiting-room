import React, { useEffect, useRef, useState } from "react"
import { navigate } from "gatsby"
import { useInView } from "react-intersection-observer"
import { useMediaQuery } from "react-responsive"
import Player from "@vimeo/player"

import GridCellDesktop from "./GridCellDesktop"
import GridCellMobile from "./GridCellMobile"
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
  "Jeffrey Hillburn": "518009857",
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
Object.entries(videosBackground).forEach(
  ([name, id]) =>
    (videosBackground[name] = `https://player.vimeo.com/video/${id}?controls=0`)
)

const GridCell = ({ image, quote, fullName, color, video_link }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  return isTabletOrMobile ? (
    <GridCellMobile
      image={image}
      quote={quote}
      fullName={fullName}
      color={color}
      video_link={video_link}
      videosBackground={videosBackground}
    />
  ) : (
    <GridCellDesktop
      image={image}
      quote={quote}
      fullName={fullName}
      color={color}
      video_link={video_link}
      videosBackground={videosBackground}
    />
  )
}

export default GridCell
