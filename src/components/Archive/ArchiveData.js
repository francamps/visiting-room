import React from "react"

import Archive from "./Archive"

import useProfiles from "../../utils/useProfiles"

const ArchiveData = ({ data }) => {
  const { loading, profiles, images } = useProfiles({ data })

  return (
    <Archive
      profiles={Object.values(profiles).filter(p => p.show_in_archive)}
      loading={loading}
      images={images}
    />
  )
}

export default ArchiveData
