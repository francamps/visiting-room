import React from "react"
import { Link } from "gatsby"

import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="link-wrap">
        <Link to="/visiting-room" className="hover-link">
          Enter the Visiting Room
        </Link>
      </div>
      <div className="link-wrap">
        <Link to="/history" className="hover-link">
          Learn the history of life without parole
        </Link>
      </div>
    </div>
  )
}

export default Footer
