import { get as getValue } from "lodash"

const useProfiles = props => {
  const profiles = getValue(props, "data.allPrismicProfile.edges", []).map(
    profile => profile.node.data
  )
  const images = getValue(props, "data.images", [])

  return {
    profiles,
    loading: false,
    images,
  }
}

export default useProfiles
