import React from "react"
import { Link } from "gatsby"

import Header from "../components/Header"

const NotFoundPage = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }}
  >
    <Header title="Page not found" />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Link to="/visiting-room">Go back to the visiting room.</Link>
    </div>
  </div>
)

export default NotFoundPage
