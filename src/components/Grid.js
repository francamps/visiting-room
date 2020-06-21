import React from "react"

import GridCell from "./GridCell"

import "./Grid.css"
import "./HomeVideo.css"

import getProfileProps from "../utils/getProfileProps"

const USE_PRISMIC = true

const Grid = ({ searchTerm, profiles, images, setProfile }) => {
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
        .map((node, idx) => {
          const {
            image,
            fullName,
            quote,
            profile_picture,
            color,
          } = getProfileProps(node, images, USE_PRISMIC)

          return (
            <GridCell
              key={fullName.replace(/ /g, "_")}
              image={image}
              fullName={fullName}
              quote={quote}
              profile_picture={profile_picture}
              setProfile={setProfile}
              color={color}
            />
          )
        })}
    </div>
  )
}

export default Grid
