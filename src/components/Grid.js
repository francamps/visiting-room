import React from "react"

import GridCell from "./GridCell"

import "./Grid.css"

import getProfileProps from "../utils/getProfileProps"
import { videos } from "../content/videoRegistry"

const USE_PRISMIC = true

const Grid = ({ searchTerm, profiles = [], images }) => {
  return (
    <div className="grid">
      {profiles
        .filter(node => {
          const profile = USE_PRISMIC ? node.node : node
          if (searchTerm === null || searchTerm === "") return true
          if (
            profile.full_name &&
            profile.full_name[0].text.indexOf(searchTerm) > -1
          )
            return true
          return false
        })
        .map((node, idx) => getProfileProps(node, images, USE_PRISMIC))
        .sort((a, b) => {
          const aHasVideo = videos[a.fullName]
          const bHasVideo = videos[a.fullName]
          if (aHasVideo > bHasVideo) return 1
          if (aHasVideo <= bHasVideo) return -1
        })
        .map(props => {
          const { image, fullName, quote, profile_picture, color } = props

          return (
            <GridCell
              key={fullName.replace(/ /g, "_")}
              image={image}
              fullName={fullName}
              quote={quote}
              profile_picture={profile_picture}
              color={color}
            />
          )
        })}
    </div>
  )
}

export default Grid
