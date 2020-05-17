import React from "react"
import { animated } from "react-spring"

import GridCell from "./GridCell"

import "./Grid.css"
import "./HomeVideo.css"

const USE_PRISMIC = true

const getProps = (node, imageData, USE_PRISMIC) => {
  const profile = USE_PRISMIC ? node.node : node
  const profile_picture = USE_PRISMIC
    ? profile.imagepath[0].text
    : profile.imagePath
  const quote =
    USE_PRISMIC && profile.quote ? profile.quote[0].text : profile.quote
  const fullName = USE_PRISMIC ? profile.full_name[0].text : profile.name

  const image = imageData.edges.find(n => {
    return n.node.relativePath.includes(profile_picture)
  })

  return {
    quote,
    fullName,
    image,
    profile_picture,
  }
}

const Grid = ({ searchTerm, profiles, images, setProfile }) => {
  return (
    <animated.div className="grid">
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
          const { image, fullName, quote, profile_picture } = getProps(
            node,
            images,
            USE_PRISMIC
          )

          return (
            <GridCell
              image={image}
              fullName={fullName}
              quote={quote}
              profile_picture={profile_picture}
              setProfile={setProfile}
            />
          )
        })}
    </animated.div>
  )
}

export default Grid
