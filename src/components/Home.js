import React from "react"
import { Link, navigate } from "gatsby"

import Play from "./Play"
import Menu from "./Menu"
import GridButton from "./GridButton"
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
          <div className="title">THE VISITING ROOM</div>
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
            <div
              className="button"
              onClick={() => {
                navigate("/visiting-room")
              }}
            >
              <h3>Enter the Visting Room</h3>
            </div>

            <div
              className="button"
              onClick={() => {
                navigate("/history")
              }}
            >
              <h3>Explore the History</h3>
            </div>
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
      {
        null /*<section>
        <div className="animation">
          <div className="video-wrap">
            <div className="video-placeholder" />
            <Play />
            </div>
        </div>
        <Link to="/history">
          <div
            className="button"
            onClick={() => {
              navigate("/history")
            }}
          >
            <div className="link-wrap">
              <span className="hover-link">
                Learn the history of Life Without Parole sentencing
              </span>
            </div>
          </div>
        </Link>
        <HomeCarousel />
        <Link to="/visiting-room">
          <div
            className="button"
            onClick={() => {
              navigate("/visiting-room")
            }}
          >
            <div className="link-wrap">
              <span className="hover-link">Go to the Visiting Room</span>
            </div>
          </div>
        </Link>

        <div className="about-button">
          <Link to="/about">
            <div
              className="button"
              onClick={() => {
                navigate("/about")
              }}
            >
              <div className="link-wrap">
                <span className="hover-link">About the project</span>
              </div>
            </div>
          </Link>
        </div>
      </section>*/
      }

      <Footer />
    </div>
  )
}

export default Home
