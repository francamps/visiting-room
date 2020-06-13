import React, { useState, useReducer, useEffect } from "react"
import { get as getValue } from "lodash"

import profileReducer from "./profileReducer"
import initProfiles from "./initProfiles"

const useProfiles = props => {
  const [fetchProps, setFetchProps] = useState({
    hasNext: getValue(props, "data.prismic.allProfiles.pageInfo.hasNextPage"),
    cursor: getValue(props, "data.prismic.allProfiles.pageInfo.endCursor", ""),
  })

  const firstProfiles = getValue(props, "data.prismic.allProfiles.edges", [])
  const [profiles, dispatch] = useReducer(
    profileReducer,
    firstProfiles,
    initProfiles
  )

  const images = getValue(props, "data.images", [])

  useEffect(() => {
    if (fetchProps.hasNext) {
      setTimeout(() => {
        props.prismic
          .load({
            variables: { after: fetchProps.cursor },
          })
          .then(res => {
            setFetchProps({
              hasNext: res.data.allProfiles.pageInfo.hasNextPage,
              cursor: res.data.allProfiles.pageInfo.endCursor,
            })

            const newProfilesDict = {}
            res.data.allProfiles.edges.forEach(({ node }) => {
              const name = getValue(node, "full_name[0].text")
              if (name) newProfilesDict[name] = node
            })
            dispatch(newProfilesDict)
          })
      }, 200)
    }
  }, [fetchProps.cursor, fetchProps.hasNext, props.prismic])

  return {
    profiles,
    loading: fetchProps.hasNext,
    images,
  }
}

export default useProfiles
