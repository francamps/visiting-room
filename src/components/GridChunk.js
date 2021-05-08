import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import GridCell from "./GridCell"

import getProfileProps from "../utils/getProfileProps"

const GridChunk = ({ profileChunk, isSoundEnabled, setCurrentChunk }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      setCurrentChunk()
    }
  }, [inView])

  return (
    <div ref={ref} className={`grid ${inView ? "" : "fadeout"}`}>
      {profileChunk
        .map((node, idx) => getProfileProps(node))
        .map(props => {
          const {
            image,
            fullName,
            quote,
            profile_picture,
            color,
            video_link,
          } = props

          return (
            inView && (
              <GridCell
                key={fullName.replace(/ /g, "_")}
                image={image}
                fullName={fullName}
                quote={quote}
                isSoundEnabled={isSoundEnabled}
                profile_picture={profile_picture}
                color={color}
                video_link={video_link}
                isLoadBackgrounds={inView}
              />
            )
          )
        })}
    </div>
  )
}

export default GridChunk
