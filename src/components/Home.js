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
            <Play size="large" />
            <span>
              Serving Life Without Parole at Louisiana State Penitentiary -
              Angola.
            </span>
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
                  <span className="hover-link">
                    <h3>Enter the Visting Room</h3>
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
            The Visiting Room is a series of life-history interviews, filmed at
            the Louisiana State Penitentiary, Angola —a former slave
            plantation—, and the largest maximum security prison farm in the
            U.S.
          </p>
          <p style={{ marginBottom: 0 }}>
            This project is about making people serving life without parole
            sentences, along with their stories, visible.
          </p>
        </article>
      </section>
      <Footer />
    </div>
  )
}

export default Home
