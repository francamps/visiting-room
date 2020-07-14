import { get as getValue } from "lodash"
import moment from "moment"

const getProfileProps = (profile, imageData, USE_PRISMIC) => {
  const profile_picture = USE_PRISMIC
    ? getValue(profile, "imagepath[0].text") || null
    : profile.imagePath

  const quote =
    USE_PRISMIC && profile.quote ? profile.quote[0].text : profile.quote
  const fullName = USE_PRISMIC ? profile.full_name[0].text : profile.name

  const image = imageData.edges.find(n => {
    return (
      n.node.relativePath.includes(profile_picture) ||
      n.node.relativePath === `profile_pics/${fullName.replace(/ /g, "_")}.jpg`
    )
  })

  let date_of_birth = moment(getValue(profile, "date_of_birth[0].text"))
  let date_of_offense = moment(profile.date_of_offense)
  let age_at_offense = "unknown"

  let deceased_date = getValue(profile, "deceased_date")

  if (date_of_birth.isValid() && date_of_offense.isValid()) {
    age_at_offense = date_of_offense.diff(date_of_birth, "years")
  }
  date_of_birth = date_of_birth.isValid() ? date_of_birth.format() : "unknown"
  date_of_offense = date_of_offense.isValid()
    ? date_of_offense.format("YYYY")
    : "unknown"
  const current_age = moment().diff(date_of_birth, "years")

  const color = getValue(profile, "color", "var(--clr-primary)")

  return {
    quote,
    fullName,
    image,
    profile_picture,
    date_of_birth,
    date_of_offense,
    age_at_offense,
    current_age,
    color,
    deceased_date,
  }
}

export default getProfileProps
