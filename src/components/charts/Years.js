import React, { useEffect, useState } from "react"

const Circle = ({ color, current, incarcerated, deceased_date, i }) => {
  //const [opacity, setOpacity] = useState(0)
  const [visible, setVisible] = useState(false)
  const x = Math.floor(i / 5) * 6 + 3
  const y = (i % 5) * 6 + 20
  const delay = (1000.0 * i) / current
  const opacity =
    i > current && deceased_date
      ? 0
      : i < current
      ? 1
      : -0.6 + (120 - i) / (120 - current)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, delay)
  }, [])

  return (
    <circle
      key={`year-${i}`}
      cx={`${x}px`}
      cy={`${y}px`}
      r={2}
      fill={i < +incarcerated ? color : "var(--clr-primary)"}
      style={{
        opacity,
        //transition: `opacity ${(2 * current) / 120}s ease-in`,
        visibility: visible ? "visible" : "hidden",
      }}
    />
  )
}

const Years = ({ color, incarcerated, current, deceased_date }) => {
  const years = new Array(120).fill(0)

  return (
    <svg width="140px" height="70px">
      <filter id="blurMe">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
      {years.map((_, i) => {
        return (
          <Circle
            key={`circle-${i}`}
            color={color}
            current={current}
            incarcerated={incarcerated}
            deceased_date={deceased_date}
            i={i}
          />
        )
      })}
      <text
        x={Math.floor(incarcerated / 5) * 6 + 3 + 3}
        y={10}
        fill={color}
        style={{
          fontSize: "var(--font-xsmall)",
          textAnchor: "end",
          fontFamily: "Roboto Helvetica Neue, Arial, sans-serif",
        }}
        className="fadein"
      >
        {incarcerated}
      </text>
      <text
        x={Math.floor(current / 5) * 6 + 3 + 3}
        y={10}
        fill="var(--clr-primary)"
        style={{
          fontSize: "var(--font-xsmall)",
          textAnchor: "end",
          fontFamily: "Roboto Helvetica Neue, Arial, sans-serif",
        }}
        className="fadein"
      >
        {current}
      </text>
    </svg>
  )
}

export default Years
