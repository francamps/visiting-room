const path = require(`path`)

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const { data } = await graphql(`
    query {
      allPrismicProfile {
        edges {
          node {
            data {
              first_name {
                text
              }
              date_of_birth {
                text
              }
              date_of_offense
              video_link {
                url
              }
              last_name {
                text
              }
              full_name {
                text
              }
              imagepath {
                text
              }
              quote {
                text
              }
              show_profile_in_visiting_room
              show_in_archive
              color
              profile_picture {
                fluid(maxWidth: 1000, maxHeight: 800) {
                  src
                }
              }
            }
          }
        }
      }
    }
  `)

  const profiles = data
    ? data.allPrismicProfile.edges.map(profile => profile.node.data)
    : []

  const visitingRoomProfiles = profiles.filter(
    profile => profile.show_profile_in_visiting_room
  )

  profiles.forEach(profile => {
    const profileId = profile.full_name.text.toLowerCase().replace(/ /g, "_")

    const nextProfile =
      visitingRoomProfiles[
        Math.floor(Math.random() * visitingRoomProfiles.length)
      ]

    // Create a page for each person.

    if (profile.show_profile_in_visiting_room) {
      createPage({
        path: `/visiting-room/${profileId}`,
        component: path.resolve(
          "./src/components/VisitingRoom/VisitingRoomProfile.js"
        ),
        context: {
          profileId,
          ...profile,
          nextProfile,
        },
      })
    }

    if (profile.show_in_archive) {
      createPage({
        path: `/archive/${profileId}`,
        component: path.resolve("./src/components/Archive/ArchiveProfile.js"),
        context: {
          profileId,
          ...profile,
        },
      })
    }
  })
}

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  const config = {
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  }

  actions.setWebpackConfig(config)
}
