export const getSeconds = stringTime => {
  const [hours, minutes, seconds] = stringTime.split(":")

  return +hours * 3600 + +minutes * 60 + +seconds
}

export const getNameUri = fullName => fullName.toLowerCase().replace(/ /g, "_")

export const handleKeyUp = (ev, cb) => {
  // enter key
  if (ev.keyCode === 13) {
    cb()
  }
}
