import React from "react"
import PropTypes from "prop-types"

import Transition from "../components/Transition"

import "./Layout.css"

const Layout = ({ children, location }) => {
  return (
    <div id="app" className="app">
      <Transition location={location}>{children}</Transition>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
