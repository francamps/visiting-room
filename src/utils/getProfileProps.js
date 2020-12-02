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
  return Math.floor((dateB.getTime() - dateA.getTime()) / (86400000 * 365))
}

const getProfileProps = (profile, imageData, USE_PRISMIC) => {
  const profile_picture = USE_PRISMIC
    ? getValue(profile, "imagepath.text") || null
    : profile.imagePath

  const quote =
    USE_PRISMIC && profile.quote ? profile.quote.text : profile.quote
  const fullName = USE_PRISMIC ? profile.full_name.text : profile.name

  const prismicPicture = getValue(profile, "profile_picture.fluid", null)
  const image = imageData.edges.find(n => {
    return (
      n.node.relativePath.includes(profile_picture) ||
      n.node.relativePath === `profile_pics/${fullName.replace(/ /g, "_")}.jpg`
    )
  })

  const prismicOldPicture = getValue(profile, "old_picture.fluid", null)
  const oldImage = imageData.edges.find(n => {
    return (
      n.node.relativePath ===
      `profile_pics/old_pics/${fullName.replace(/ /g, "_")}.jpg`
    )
  })

  let date_of_birth = getDate(profile, "date_of_birth.text")
  let date_of_offense = getDate(profile, "date_of_offense")
  let age_at_offense = "unknown"
  let deceased_date = getDate(profile, "deceased_date")

  if (date_of_birth && date_of_offense) {
    age_at_offense = subtractDatesInYears(date_of_offense, date_of_birth)
  }

  date_of_birth = date_of_birth || "unknown"
  date_of_offense = date_of_offense ? date_of_offense.getYear() : "unknown"
  const current_age =
    date_of_birth !== "unknown"
      ? subtractDatesInYears(new Date(), date_of_birth)
      : "unknown"

  const color = getValue(profile, "color", "var(--clr-primary)")

  return {
    quote,
    fullName,
    image: prismicPicture,
    oldImage: prismicOldPicture,
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
