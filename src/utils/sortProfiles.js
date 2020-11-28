import { get as getValue } from "lodash"
import moment from "moment"

const getProfileValue = (profile, prop) => {
  let date_of_birth = moment(getValue(profile, "date_of_birth.text"))
  date_of_birth = date_of_birth.isValid() ? date_of_birth : "unknown"

  let date_of_offense = moment(getValue(profile, "date_of_offense"))
  date_of_offense = date_of_offense.isValid() ? date_of_offense : "unknown"

  let age_at_offense = "unknown"
  age_at_offense =
    date_of_offense !== "unknown" &&
    date_of_birth !== "unknown" &&
    date_of_birth.isValid() &&
    date_of_offense.isValid()
      ? date_of_birth.diff(date_of_offense, "years")
      : "unknown"

  switch (prop.key) {
    case "full_name":
      return getValue(profile, "full_name.text")
    case "current_age":
      if (date_of_birth === "unknown") return -Infinity
      const current_age = moment().diff(date_of_birth, "years")
      return current_age
    case "age_at_offense":
      if (age_at_offense === "unknown") return -Infinity
      return age_at_offense
    case "offense_date":
      if (date_of_offense === "unknown") return -Infinity
      return moment(date_of_offense).valueOf()
    default:
      return -Infinity
  }
}

const sortProfiles = (data, sortType, sortAsc) => {
  data.sort((a, b) => {
    if (getProfileValue(a, sortType) > getProfileValue(b, sortType))
      return sortAsc ? 1 : -1
    if (getProfileValue(a, sortType) < getProfileValue(b, sortType))
      return sortAsc ? -1 : 1
    return false
  })

  return data
}

export default sortProfiles
