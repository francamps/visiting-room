const initProfiles = profiles => {
  const setofprofs = {}
  profiles.forEach(p => {
    setofprofs[p.node.full_name[0].text] = p.node
  })
  return setofprofs
}

export default initProfiles
