require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `The Visiting Room`,
    description: `The history of life without parole in Louisiana`,
    author: `@gatsbyjs`,
  },
  plugins: [
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: `${process.env.PRISMIC_REPOSITORY_NAME}`, // (REQUIRED, replace with your own)
        accessToken: `${process.env.PRISMIC_ACCESS_TOKEN}`, // (optional API access token)
        path: "/preview", // (optional preview path. Default: /preview)
        previews: false, // (optional, activated Previews. Default: false)
        pages: [],
      },
    },
    //`gatsby-plugin-transition-link`,
  ],
}
