import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import Caret from "../Caret"

import image from "../../images/timeline/1800s.png"

const TimelineCover = ({ setInView }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.5,
  })

  useEffect(() => {
    setInView(inView)
  }, [inView])

  return (
    <div
      ref={ref}
      className="timeline-cover"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "0px",
          color: "var(--clr-black)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "var(--font-subtitle)",
          }}
        >
          A History of Life Without Parole in Louisiana
        </h2>
        <div
          style={{
            position: "absolute",
            bottom: "var(--space-around-med)",
          }}
        >
          <div
            style={{
              transform: "scale(0.7)",
              transformOrigin: "center center",
              textAlign: "center",
            }}
          >
            <Caret color="var(--clr-black)" animate />
          </div>
          <span
            style={{
              fontFamily: "Roboto, Helvetica Neue, Arial, sans-serif",
              fontSize: "var(--font-small)",
              marginTop: "0px",
            }}
          >
            SCROLL
          </span>
        </div>
      </div>
    </div>
  )
}

export default TimelineCover
