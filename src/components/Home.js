import React from "react"
import { Link, navigate } from "gatsby"

import Play from "./Play"
import Menu from "./Menu"
import HomeVideo from "./HomeVideo"
import Footer from "./Footer"

import "./Home.css"

const Home = () => {
  return (
    <div className="home">
      <Menu isExpanded={false} />
      <div className="landing">
        <HomeVideo />
        <div className="text-on-landing">
          <div className="title">The Visiting Room</div>
          <div
            className="subtitle"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span>Serving Life Without Parole at Angola</span>
          </div>
          <div className="buttons">
            <Link to="/visiting-room">
              <div
                className="button"
                onClick={() => {
                  navigate("/visiting-room")
                }}
              >
                <div className="link-wrap">
                  <Play />
                  <span className="hover-link" style={{ marginLeft: "8px" }}>
                    <h3>What is Life Without Parole</h3>
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/history">
              <div
                className="button"
                onClick={() => {
                  navigate("/history")
                }}
              >
                <div className="link-wrap">
                  <span className="hover-link">
                    <h3>Explore the History</h3>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <section className="highlight-wrap">
        <article className="copy">
          <p>
            The Visiting Room is a series of life-history interviews with people
            serving life without the possibility of parole, a sentence to die in
            prison that is being served by more than fifty thousand Americans
            today.
          </p>
          <p style={{ marginBottom: 0 }}>
            All interviews were filmed at the Louisiana State Penitentiary,
            Angola. Per capita, more people serve this sentence in Louisiana
            than any other place in the world.
          </p>
        </article>
      </section>
      <Footer />
    </div>
  )
}

export default Home
