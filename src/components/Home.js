import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import Play from "./Play"
import Menu from "./Menu"
import HomeVideo from "./HomeVideo"
import Footer from "./Footer"
import EnterIcon from "./Symbols/EnterIcon"
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
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params}`
        )
        setVisitingRoom(true)
        setFadeOutLanding(false)
      }, 1200)

      return () => {
        clearTimeout(timer1)
      }
    }
  }, [fadeoutLanding])

  return (
    <>
      <Menu isExpanded={false} hideTitle />
      {!isVisitingRoom ? (
        <div className={`home ${fadeoutLanding ? "fadeout" : ""}`}>
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
                <div
                  className="primary-action"
                  style={{ display: "inline-block" }}
                >
                  <a
                    onClick={() => {
                      params.set("visiting", true)
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "GTPressura",
                        fontWeight: "500",
                        fontSize: "1.5rem",
                        marginBottom: "10px",
                        marginLeft: "15px",
                      }}
                    >
                      Enter
                      <div
                        style={{
                          marginLeft: "20px",
                          display: "inline-block",
                          transform: "scale(0.7) translateY(5px)",
                          transformOrigin: "center center",
                        }}
                      >
                        <EnterIcon />
                      </div>
                    </h2>
                  </a>
                </div>
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
                  A series of life-history interviews with individuals who are
                  serving "life without parole", a sentence to remain in prison
                  until death.
                </p>
                <p>
                  All interviews were filmed at the Louisiana State
                  Penitentiary, Angola.
                </p>
              </div>

              <div className="buttons" style={{ marginLeft: "15px" }}>
                <a>
                  <div
                    className="button"
                    onClick={() => {
                      params.set("visiting", true)
                    }}
                  >
                    <div className="link-wrap">
                      <Play />
                      <span
                        className="hover-link"
                        style={{ marginLeft: "8px" }}
                      >
                        <h3>What is Life Without Parole</h3>
                      </span>
                    </div>
                  </div>
                </a>
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
            {null /*<Footer />*/}
          </div>
        </div>
      ) : (
        <VisitingRoom
          loading={loading}
          profiles={Object.values(profiles).filter(
            p => p.show_profile_in_visiting_room
          )}
          images={images}
        />
      )}
    </>
  )
}

export default Home
