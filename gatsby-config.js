require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const { linkResolver } = require("./src/utils/linkResolver")

module.exports = {
  siteMetadata: {
    title: `The Visiting Room`,
    description: `The history of life without parole in Louisiana`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: true,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/index.js`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-lodash`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: `${process.env.PRISMIC_REPOSITORY_NAME}`, // (REQUIRED, replace with your own)
        accessToken: `${process.env.PRISMIC_ACCESS_TOKEN}`, // (optional API access token),
        schemas: {
          about: require("./src/schemas/about.json"),
          faq: require("./src/schemas/faq.json"),
          glossary_term: require("./src/schemas/glossary_term.json"),
          profile: require("./src/schemas/profile.json"),
        },
      },
    },
  ],
}
