import React from "react"

import Social from "./Symbols/Social"

import "./Footer.css"

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <h5>Produced with the support of</h5>
        <ul className="partners">
          <li>Vital Projects Fund</li>
          <li>Loyola University at New Orleans</li>
          <li>NEW INC</li>
        </ul>

        <ul className="socials">
          <li></li>
          <li>
            <b>Share on</b>
            <Social social="twitter" />
            <Social social="twitter" />
          </li>
          <li>
            <b>Follow the project</b>
            <Social social="instagram" />
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
