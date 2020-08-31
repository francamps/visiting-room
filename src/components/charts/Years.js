import React from "react"

const Years = ({ color, incarcerated, current, deceased_date }) => {
  const years = new Array(120).fill(0)

  return (
    <svg width="140px" height="50px">
      <filter id="blurMe">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
      {years.map((_, i) => {
        const x = Math.floor(i / 5) * 6 + 3
        const y = (i % 5) * 6 + 15

        return (
          <circle
            key={`year-${i}`}
            cx={`${x}px`}
            cy={`${y}px`}
            r={2}
            fill={i < +incarcerated ? color : "var(--clr-primary)"}
            style={{
              opacity:
                i > current && deceased_date
                  ? 0
                  : i < current
                  ? 1
                  : -0.6 + (120 - i) / (120 - current),
              transition: `opacity 4s`,
            }}
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
          fontFamily: "GTPressura",
        }}
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
          fontFamily: "GTPressura",
        }}
      >
        {current}
      </text>
    </svg>
  )
}

export default Years