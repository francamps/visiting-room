import React from "react"
import { Link, navigate } from "gatsby"

import Play from "./Play"
import GridButton from "./GridButton"
import HomeVideo from "./HomeVideo"
import "./Home.css"

const Home = () => {
  return (
    <div className="home">
      <div className="landing">
        <HomeVideo />
        <div className="text-on-landing" style={{ position: "absolute" }}>
          <div className="title">The Visiting Room</div>
          <div className="subtitle">
            An archive and visiting room of the 527 men who are serving life
            without parole at Louisiana State Penitentiary - Angola.
          </div>
          <div className="buttons">
            <div
              className="button"
              onClick={() => {
                navigate("/visiting-room")
              }}
            >
              <Play useCircle={false} />
              <h3>Play</h3>
            </div>

            <div
              className="button"
              onClick={() => {
                navigate("/visiting-room")
              }}
            >
              <GridButton useCircle={false} />
              <h3>Visting room</h3>
            </div>
          </div>
        </div>
      </div>
      <section className="copy-wrap">
        <article className="copy">
          <div className="lede">
            <div className="lede-initial">L</div>
            <p className="lede-content">
              ouisiana has the highest percentage of prisoners serving life
              without parole in the country, the people serving those sentences
              are largely invisible. This project is about making those people,
              along with their stories, visible.
            </p>
          </div>
          <p>
            It centers on a compilation of life-history interviews filmed at the
            Louisiana State Penitentiary – Angola, a former slave plantation,
            and the largest maximum security prison farm in the U.S.
          </p>
        </article>
        <Link to="/visiting-room">
          <div
            className="button go-to-vr"
            onClick={() => {
              navigate("/visiting-room")
            }}
          >
            <div class="link-wrap">
              <span className="hover-link">Go to the Visiting Room ></span>
            </div>
          </div>
        </Link>
        <Link to="/timeline">
          <div
            className="button go-to-vr"
            onClick={() => {
              navigate("/timeline")
            }}
          >
            <div className="link-wrap">
              <span className="hover-link">
                Learn the history of Life Without Parole sentencing
              </span>
            </div>
          </div>
        </Link>

        <Link to="/about">
          <div
            className="button go-to-vr"
            onClick={() => {
              navigate("/about")
            }}
          >
            <div className="link-wrap">
              <span className="hover-link">About the project</span>
            </div>
          </div>
        </Link>
      </section>

      <section className="footer">
        <div className="footer-wrapper">
          <h5>Produced with the support of</h5>

          <ul>
            <li>Vital Projects Fund</li>
            <li>Loyola University at New Orleans</li>
            <li>NEW INC</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Home
