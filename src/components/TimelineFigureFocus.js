import React from "react"
import { useSpring, animated } from "react-spring"

import CrossClose from "./CrossClose"
import image4 from "../images/timeline/image4.jpg"

const TimelineFigureFocus = ({ image, setFigureActive }) => {
  const fadeInProps = useSpring({
    config: { duration: 400 },
    to: { opacity: 1, filter: "blur(0)" },
    from: {
      opacity: 0,
      filter: "blur(1.5rem)",
    },
  })

  return (
    <animated.div
      style={{
        ...fadeInProps,
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 12,
        background: "var(--clr-mid-grey)",
      }}
    >
      <CrossClose
        onClick={() => {
          setFigureActive(null)
        }}
      />
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: "80px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="info"
          style={{ width: "120px", textAlign: "right", paddingRight: "20px" }}
        >
          <h3 style={{ marginTop: 0 }}>This image is this and that</h3>
          <p>And here is an explanation of the image</p>
        </div>
        <div
          className="lightbox"
          style={{
            flex: 1,
          }}
        >
          <img
            src={image4}
            alt="Angolite article The Forgotten men"
            style={{ width: "70%" }}
          />
        </div>
      </div>
    </animated.div>
  )
}

export default TimelineFigureFocus
