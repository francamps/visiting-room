import { get as getValue } from "lodash"
import isNull from "lodash/isNull"

const getDate = (profile, key) => {
  const textDate = getValue(profile, key, null)
  if (isNull(textDate)) return false
  const arrDate = textDate.split("/")

  if (arrDate.length === 3) {
    return new Date(arrDate[2], +arrDate[0] - 1, arrDate[1])
  } else {
    const arrDateB = textDate.split("-")
    if (arrDateB.length === 3) {
      return new Date(arrDateB[0], +arrDateB[1], arrDateB[2])
    }
    return false
  }
}

const subtractDatesInYears = (dateB, dateA) => {
  return Math.floor((dateB.getTime() - dateA.getTime()) / (86400 * 365))
}

const getProfileValue = (profile, prop) => {
  // TODO: Prismic date should be coerced to date, not tex
  let date_of_birth = getDate(profile, "date_of_birth.text")
  date_of_birth = date_of_birth || "unknown"

  let date_of_offense = getDate(profile, "date_of_offense")
  date_of_offense = date_of_offense || "unknown"

  let age_at_offense = "unknown"
  age_at_offense =
    date_of_offense !== "unknown" &&
    date_of_birth !== "unknown" &&
    date_of_birth &&
    date_of_offense
      ? subtractDatesInYears(date_of_offense, date_of_birth)
      : "unknown"

  console.log(date_of_offense, date_of_offense.getTime())

  switch (prop.key) {
    case "full_name":
      return getValue(profile, "full_name.text")
    case "current_age":
      if (date_of_birth === "unknown" || !date_of_birth) return -Infinity
      const current_age = subtractDatesInYears(new Date(), date_of_birth)
      return current_age
    case "age_at_offense":
      if (age_at_offense === "unknown" || !age_at_offense) return -Infinity
      return age_at_offense
    case "offense_date":
      if (date_of_offense === "unknown" || date_of_offense) return -Infinity
      return date_of_offense.getTime()
    default:
      return -Infinity
  }
}

const sortProfiles = (data, sortType, sortAsc) => {
  console.log(data, sortType, sortAsc)
  data.sort((a, b) => {
    if (sortType.key === "full_name") {
      if (a.last_name.text > b.last_name.text) return sortAsc ? 1 : -1
      if (a.last_name.text < b.last_name.text) return sortAsc ? -1 : 1
    } else {
      if (getProfileValue(a, sortType) > getProfileValue(b, sortType))
        return sortAsc ? 1 : -1
      if (getProfileValue(a, sortType) < getProfileValue(b, sortType))
        return sortAsc ? -1 : 1
    }
    return false
  })

  return data
}

export default sortProfiles
