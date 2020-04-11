const sortProfiles = (data, sortType, sortAsc) => {
  data.sort((a, b) => {
    if (a[sortType] > b[sortType]) return sortAsc ? 1 : -1
    if (a[sortType] < b[sortType]) return sortAsc ? -1 : 1
  })
  return data
}

export default sortProfiles
