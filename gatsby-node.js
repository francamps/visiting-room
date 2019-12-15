const path = require(`path`)

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ actions: { createPage } }) => {
  // Create a page for each Pokémon.
  createPage({
    path: `/visiting-room/arthur-carter`,
    component: path.resolve("./src/components/VisitingRoom.js"),
    context: {
      profileId: "arthur-carter",
    },
  })
}
