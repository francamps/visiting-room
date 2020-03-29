import React from "react"
import { Link, navigate } from "gatsby"

import Play from "./Play"
import GridButton from "./GridButton"
import HomeVideo from "./HomeVideo"
import HomeCarousel from "./HomeCarousel"

import image from "../images/TEMP/animationBg.jpg"

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
      <section className="highlight-wrap">
        <article className="copy">
          <div className="lede">
            {null /*<div className="lede-initial">L</div>*/}
            <p className="lede-content">
              Louisiana has the highest percentage of prisoners serving life
              without parole in the country. People serving those sentences are
              largely invisible.
            </p>
          </div>
          <p>
            This series of life-history interviews was filmed at the Louisiana
            State Penitentiary, Angola —a former slave plantation—, and the
            largest maximum security prison farm in the U.S.
          </p>
          <p style={{ marginBottom: 0 }}>
            This project is about making those people, along with their stories,
            visible.
          </p>
        </article>
      </section>
      <section>
        <div
          style={{
            height: "70vh",
            minHeight: "500px",
            background: "var(--clr-black)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "480px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <img
              width={"640px"}
              height={"480px"}
              src={image}
              style={{ position: "absolute" }}
            />
            <Play />
          </div>
          <Link to="/timeline">
            <div
              className="button"
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
        </div>

        <div
          style={{
            height: "70vh",
            minHeight: "400px",
            maxHeight: "600px",
            background: "var(--clr-dark-bg)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            padding: "0px 20px",
            overflow: "scroll",
            boxSizing: "border-box",
          }}
        >
          <HomeCarousel />
        </div>
        <Link to="/visiting-room">
          <div
            className="button"
            onClick={() => {
              navigate("/visiting-room")
            }}
          >
            <div class="link-wrap">
              <span className="hover-link">Go to the Visiting Room</span>
            </div>
          </div>
        </Link>

        <div
          style={{
            height: "200px",
            background: "var(--clr-dark-bg)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
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
