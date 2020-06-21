import React from "react"

import Social from "./Symbols/Social"

const Socials = () => (
  <div
    className="socials"
    style={{
      position: "fixed",
      top: 20,
      right: 20,
      display: "flex",
      flexDirection: "row",
      zIndex: 10,
    }}
  >
    <Social social="twitter" />
    <Social social="instagram" />
  </div>
)

export default Socials
