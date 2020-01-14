import React from "react"

import image1 from "../images/TEMP/timeline/image1.png"
import image2 from "../images/TEMP/timeline/image2.png"
//import image3 from "../images/TEMP/timeline/image3.png"
import image4 from "../images/TEMP/timeline/image4.jpg"
//import image5 from "../images/TEMP/timeline/image5.png"
import image6 from "../images/TEMP/timeline/image6.png"
//import image7 from "../images/TEMP/timeline/image7.png"

import ChartA from "./charts/ChartA"
import ChartB from "./charts/ChartB"

const images = [null, image1, image2, null, null, null, image4, null, image6]

const TimelineFigure = ({ step = 1, caption, setFigureActive }) => {
  return (
    <figure className={`stickness ${step === 4 ? "static" : ""}`}>
      {step === 2 && (
        <div className="chart-wrap">
          <ChartA />
          <h4 className="title">
            People serving life without parole in Louisiana
          </h4>
        </div>
      )}
      {step === 3 && (
        <div className="chart-wrap">
          <ChartB />
          <h4 className="title">
            State prison commutations in Louisiana by Governor
          </h4>
        </div>
      )}
      {step !== 3 && images[step] && (
        <>
          <img
            src={images[step]}
            alt="Angolite article The Forgotten men"
            style={{
              width: "100%",
              right: 0,
            }}
            onClick={() => {
              setFigureActive(images[step])
            }}
          />
          {caption && <p className="caption">{caption}</p>}
        </>
      )}
    </figure>
  )
}

export default TimelineFigure
