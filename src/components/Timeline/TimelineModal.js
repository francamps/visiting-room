import React from "react"
import { useSpring, animated } from "react-spring"

import CrossClose from "../CrossClose"

import "./TimelineModal.css"

const TimelineModal = ({ content, setModal }) => {
  const fadeInProps = useSpring({
    config: { duration: 400 },
    to: { opacity: 1 },
    from: {
      opacity: 0,
    },
  })

  return (
    <animated.div
      className=""
      style={{
        ...fadeInProps,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        backdropFilter: "blur(10px)",
        background: "rgba(var(--clr-black-rgb), 0.3)",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "10px 5px 5px white",
        zIndex: 12,
      }}
      onClick={() => {
        setModal(false)
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
      >
        <CrossClose
          onClick={() => {
            setModal(false)
          }}
          theme="light"
        />
      </div>
      <div className="modal">
        <p>{content}</p>
      </div>
    </animated.div>
  )
}

export default TimelineModal
