import React from "react"

import { animated, useSpring } from "react-spring"

import "./TimeSlider.css"

const TimeSlider = () => {
  const props = useSpring({
    config: { duration: 20000 },
    from: { width: 0 },
    to: { width: 140 },
  })

  return (
    <div className="slider-wrapper">
      <div className="slider">
        <div className="slider-bg"></div>
        <animated.div className="slider-track" style={props}></animated.div>
      </div>
    </div>
  )
}

export default TimeSlider
