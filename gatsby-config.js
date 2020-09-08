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
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/index.js`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`, //,
        //icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
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
