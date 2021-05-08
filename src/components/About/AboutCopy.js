import React, { useState } from "react"
import "react-tabs/style/react-tabs.css"

import stateFarm from "../../images/stateFarm.png"
import "./AboutCopy.css"
import { handleKeyUp } from "../../utils"

const OneAbout = ({ about, idx, aboutNumber, handleClickAbout }) => {
  const title = about ? about.node.data.about_this_project.text : ""
  const content = about ? about.node.data.about_content : []
  const isAngola = title === "About Angola"

  return (
    <div
      className={`about ${idx === +aboutNumber ? "about-active" : ""}`}
      id={`about-${idx}`}
      onClick={() => {
        handleClickAbout(idx)
      }}
      onKeyUp={ev =>
        handleKeyUp(ev, () => {
          handleClickAbout(idx)
        })
      }
      role="button"
      tabIndex={0}
      aria-label={`See ${title}`}
    >
      <h4>{title}</h4>
      <div className="about-content">
        <div
          className="term-content"
          dangerouslySetInnerHTML={{ __html: content.html }}
        ></div>
        <div className="map">
          <img
            src={isAngola ? stateFarm : null}
            style={{ width: "100%", height: "auto" }}
            alt={
              isAngola
                ? "An image of Angola as a state farm in the year 1900"
                : ""
            }
          />
          <p
            className="caption"
            style={{
              textAlign: "left",
              marginBottom: "20px",
              marginTop: "10px",
              fontSize: "var(--font-small)",
            }}
          >
            {isAngola
              ? "LSU Libraries Special Collections / Andrew D. Lytle's Baton Rouge Photograph Collection (1900-1901, questionable)"
              : ""}
          </p>
        </div>
      </div>
    </div>
  )
}

const AboutCopy = ({ abouts, params, updateParams }) => {
  const [aboutNumber, setAboutNumber] = useState(params.get("about") || 0)

  const parentAbout = abouts.find(
    about =>
      about.node.data.about_this_project.text ===
      "About the Visiting Room Project"
  )
  const childrenAbouts = abouts
    .filter(
      about =>
        about.node.data.about_this_project.text !==
        "About the Visiting Room Project"
    )
    .sort((a, b) => {
      if (a.node.data.about_this_project.text === "About Life Without Parole")
        return -1
      if (a.node.data.about_this_project.text === "About Angola") return 0
      if (a.node.data.about_this_project.text === "About The Angolite") return 1
      return null
    })

  const title = parentAbout ? parentAbout.node.data.about_this_project.text : ""
  const content = parentAbout ? parentAbout.node.data.about_content : []

  const handleClickAbout = idx => {
    updateParams("about", idx === aboutNumber ? -1 : idx)
    setAboutNumber(idx === aboutNumber ? -1 : idx)
    setTimeout(
      document.querySelector(`#about-${idx}`).scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth",
      }),
      1200
    )
  }

  return (
    <>
      <article className="copy">
        <OneAbout
          about={parentAbout}
          idx={0}
          aboutNumber={aboutNumber}
          handleClickAbout={handleClickAbout}
        />

        {childrenAbouts.map((about, idx) => {
          return (
            <OneAbout
              about={about}
              idx={idx + 1}
              aboutNumber={aboutNumber}
              handleClickAbout={handleClickAbout}
            />
          )
        })}
      </article>
    </>
  )
}

export default AboutCopy
