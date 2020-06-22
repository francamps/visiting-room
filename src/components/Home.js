import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import Play from "./Play"
import Menu from "./Menu"
import HomeVideo from "./HomeVideo"
import Footer from "./Footer"
import VisitingRoom from "../components/VisitingRoom"

import "./Home.css"

const Home = ({ loading, profiles, images }) => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  )
  const [fadeoutLanding, setFadeOutLanding] = useState(false)
  const [isVisitingRoom, setVisitingRoom] = useState(
    params.get("visiting") || false
  )

  useEffect(() => {
    if (fadeoutLanding) {
      let timer1 = setTimeout(() => {
        setVisitingRoom(true)
        setFadeOutLanding(false)
      }, 1200)

      return () => {
        clearTimeout(timer1)
      }
    }
  }, [fadeoutLanding])

  return !isVisitingRoom ? (
    <div className={`home ${fadeoutLanding ? "fadeout" : ""}`}>
      <Menu isExpanded={false} hideTitle />
      <div className="landing">
        <HomeVideo />
        <div className="text-on-landing">
          <div
            className="title"
            onClick={() => {
              setFadeOutLanding(true)
            }}
          >
            The Visiting Room
          </div>
          <div
            className="subtitle"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              setFadeOutLanding(true)
            }}
          >
            <p style={{ margin: "5px 0" }}>
              The Visiting Room is a series of life-history interviews with
              individuals who are serving "life without parole", a sentence to
              remain in prison until death.
            </p>
            <p>
              The interviews were filmed at the Louisiana State Penitentiary,
              Angola.
            </p>
          </div>
          <div className="buttons">
            <Link to="/visiting-room">
              <div
                className="button"
                onClick={() => {
                  params.set("visiting", true)
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
        <Footer />
      </div>
      {
        null /*<section className="highlight-wrap">
        <article className="copy">
          <p style={{ marginBottom: 0 }}>
            The Visiting Room is a series of life-history interviews with
            individuals who are serving "life without parole", a sentence to
            remain in prison until death. The interviews were filmed at the
            Louisiana State Penitentiary, Angola.
          </p>
        </article>
      </section>*/
      }
    </div>
  ) : (
    <VisitingRoom
      loading={loading}
      profiles={Object.values(profiles).filter(
        p => p.show_profile_in_visiting_room
      )}
      images={images}
    />
  )
}

export default Home
