import React from "react"

import { graphql } from "gatsby"

import Layout from "../components/Layout"

import VisitingRoom from "../components/VisitingRoom"

import useProfiles from "../utils/useProfiles"

const VisitingRoomPage = props => {
  const { fetchProps, profiles, images } = useProfiles(props)

  return (
    <Layout>
      <VisitingRoom
        loading={fetchProps.hasNext}
        profiles={Object.values(profiles).filter(
          p => p.show_profile_in_visiting_room
        )}
        images={images}
      />
    </Layout>
  )
}

export default VisitingRoomPage
