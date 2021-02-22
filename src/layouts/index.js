import React from "react"
import PropTypes from "prop-types"

import Transition from "../components/Transition"

import "./Layout.css"

const Layout = ({ children, location }) => {
  return (
    <div id="app" className="app">
      <script src="https://player.vimeo.com/api/player.js"></script>
      <Transition location={location}>{children}</Transition>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
