import React from "react"
import { Link } from "gatsby"

import "./Footer.css"

const Footer = ({ withRefs, withArchive, withHistory, theme }) => {
  return (
    <div className={`footer ${theme === "light" ? "light" : ""}`}>
      {withRefs && (
        <div className="link-wrap">
          <Link to="/about/?tab=5" className="hover-link">
            See references
          </Link>
        </div>
      )}
      <div className="link-wrap">
        <Link to="/visiting-room" className="hover-link">
          Enter the Visiting Room
        </Link>
      </div>
      {withHistory && (
        <div className="link-wrap">
          <Link to="/history" className="hover-link">
            Learn the history of life without parole
          </Link>
        </div>
      )}
      {withArchive && (
        <div className="link-wrap">
          <Link to="/archive" className="hover-link">
            See the full archive
          </Link>
        </div>
      )}
    </div>
  )
}

export default Footer
