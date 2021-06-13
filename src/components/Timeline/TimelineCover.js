import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import Caret from "../Caret"

import "./TimelineCover.css"
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
      }}
    >
      <div className="cover-backdrop">
        <h2>A History of Life Without Parole in Louisiana</h2>
        <div className="scroll">
          <div className="caret">
            <Caret color="var(--clr-black)" animate />
          </div>
          <span className="label">SCROLL</span>
        </div>
      </div>
    </div>
  )
}

export default TimelineCover
