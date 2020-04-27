import React, { useEffect, useState, useRef } from "react"
import { scaleLinear, scaleTime } from "d3-scale"
import { select } from "d3-selection"
import { line, area } from "d3-shape"
import "d3-transition"

import "./chart.css"

const dataComs = [
  // 1972 population 3421
  { year0: 1972, yearF: 1980, label: "Edwards", value: 925 },
  { year0: 1980, yearF: 1984, label: "Treen", value: 40 },
  { year0: 1984, yearF: 1988, label: "Edwards", value: 325 },
  { year0: 1988, yearF: 1992, label: "Roemer", value: 65 },
  { year0: 1992, yearF: 1996, label: "Edwards", value: 0 },
  { year0: 1996, yearF: 2004, label: "Foster", value: 50 },
  { year0: 2004, yearF: 2008, label: "Blanco", value: 125 },
  { year0: 2008, yearF: 2016, label: "Jindal", value: 0 },
  { year0: 2016, yearF: 2020, label: "Edwards", value: 34 },
]

const dataPops = [
  // 1972 population 3421
  { yearF: 1972, value: 3421 },
  { yearF: 1980, value: 8889 },
  { yearF: 1984, value: 13659 },
  { yearF: 1988, value: 16242 },
  { yearF: 1992, value: 19986 },
  { yearF: 1996, value: 25447 },
  { yearF: 2004, value: 35885 },
  { yearF: 2008, value: 37567 },
  { yearF: 2016, value: 36533 },
  { yearF: 2020, value: 34171 },
]

const dataLifers = [
  { yearF: 1972, value: 143 },
  { yearF: 1975, value: 382 },
  { yearF: 1980, value: 802 },
  { yearF: 1985, value: 1445 },
  { yearF: 1990, value: 2039 },
  { yearF: 1995, value: 2595 },
  { yearF: 2000, value: 3150 },
  { yearF: 2005, value: 4034 },
  { yearF: 2015, value: 4850 },
  { yearF: 2020, value: 4693 },
]

// Margin
const m = {
  t: 20,
  l: 20,
  b: 30,
  r: 20,
}

const HEIGHT = 500
const WIDTH = 800

const ChartC = () => {
  const [step, setStep] = useState(0)
  const svgRef = useRef()
  const canvasRef = useRef()

  useEffect(() => {
    const w = canvasRef.current.getBoundingClientRect().width
    const h = (w * HEIGHT) / WIDTH
    const svg = select(svgRef.current)
    const pointsLifers = svg.selectAll("circle.lifers-point").data(dataLifers)
    const pointsPops = svg.selectAll("circle.pops-point").data(dataLifers)
    const pointsComs = svg.selectAll("circle.coms").data(dataComs)

    const xScale = scaleTime()
      .domain([1970, 2020])
      .range([m.l, w - m.r])

    const maxY = step === 2 ? 38000 : step === 1 ? 5000 : 1000

    const yScale = scaleLinear()
      .domain([0, maxY])
      .range([h - m.t, m.b])

    /** PRISON POPULATION & LIFERS */

    const path = area()
      .x(d => xScale(d.yearF))
      .y1(d => yScale(d.value))
      .y0(yScale(0))

    const pathLine = line()
      .x(d => xScale(d.yearF))
      .y(d => yScale(d.value))

    svg
      .selectAll("path.pops")
      .data([dataPops])
      .join("path")
      .attr("class", "pops")
      .transition()
      .attr("d", path)

    svg
      .selectAll("path.pops-line")
      .data([dataPops])
      .join("path")
      .attr("class", "pops-line")
      .transition()
      .attr("d", pathLine)

    pointsPops
      .join("circle")
      .attr("class", "pops-point")
      .attr("r", 4)
      .attr("cx", d => xScale(d.yearF))
      .transition()
      .attr("cy", d => yScale(d.value))

    svg
      .selectAll("path.lifers")
      .data([dataLifers])
      .join("path")
      .attr("class", "lifers")
      .transition()
      .attr("d", path)

    svg
      .selectAll("path.lifers-line")
      .data([dataLifers])
      .join("path")
      .attr("class", "lifers-line")
      .transition()
      .attr("d", pathLine)

    pointsLifers
      .join("circle")
      .attr("class", "lifers-point")
      .attr("r", 4)
      .attr("cx", d => xScale(d.yearF))
      .transition()
      .attr("cy", d => yScale(d.value))

    svg
      .selectAll("text.text-value")
      .data(dataLifers)
      .join("text")
      .attr("class", "text-value")
      .attr("x", d => xScale(d.yearF))
      .attr("y", d => yScale(d.value) - 15)
      .text(d => d.value)

    svg
      .selectAll("text.year")
      .data(dataLifers)
      .join("text")
      .attr("class", "year")
      .join("text")
      .attr("x", d => xScale(d.yearF))
      .attr("y", d => h - 5)
      .text(d => d.yearF)

    svg
      .selectAll("line")
      .data(dataLifers)
      .join("line")
      .attr("class", "long-ticks")
      .attr("x1", d => xScale(d.yearF))
      .attr("x2", d => xScale(d.yearF))
      .attr("y2", d => h - m.b)
      .transition()
      .attr("y1", d => yScale(d.value) + 2)

    /** COMMUTATIONS */

    const pathComs = area()
      .x(d => xScale(d.year))
      .y1(d => yScale(d.value))
      .y0(yScale(0))

    const dataComsLins = dataComs.map(d => [
      { year: d.year0, value: 0 },
      { year: d.yearF, value: d.value },
    ])

    svg
      .selectAll("path.coms")
      .data(dataComsLins)
      .join("path")
      .attr("class", d => `coms year-${d[1].year}`)
      .attr("fill", "var(--clr-chart)")
      .attr("fill-opacity", 0.7)
      .attr("stroke", "none")
      .attr("d", pathComs)

    svg
      .selectAll("line.line-coms")
      .data(dataComs)
      .join("line")
      .attr("class", "line-coms")
      .attr("x1", d => xScale(d.yearF))
      .attr("x2", d => xScale(d.yearF))
      .attr("y2", h - m.b)
      .transition()
      .attr("y1", d => yScale(d.value))

    pointsComs
      .join("circle")
      .attr("class", "coms")
      .attr("cx", d => xScale(d.yearF))
      .attr("r", 1)
      .transition()
      .attr("cy", d => yScale(d.value))

    svg
      .selectAll("text.labelComs")
      .data(dataComs)
      .join("text")
      .attr("class", "labelComs")
      .attr("x", d => xScale(d.yearF))
      .attr("y", d => yScale(d.value) - 28)
      .text(d => d.label)

    svg
      .selectAll("text.text-coms-value")
      .data(dataComs)
      .join("text")
      .attr("class", "text-coms-value")
      .attr("x", d => xScale(d.yearF))
      .attr("y", d => yScale(d.value) - 10)
      .text(d => d.value)

    svg
      .selectAll("text.yearComs")
      .data(dataComs)
      .join("text")
      .attr("class", "yearComs")
      .join("text")
      .attr("x", d => xScale(d.year0))
      .attr("y", h)
      .text(d => d.year0)

    svg.attr("width", w).attr("height", h)
  }, [step])

  return (
    <div className="chart-wrap" ref={canvasRef}>
      <svg width={WIDTH} height={HEIGHT} className="" ref={svgRef}></svg>
      <h4 className="title">
        People serving life without parole in Louisiana
        <button
          onClick={() => {
            setStep(step < 2 ? step + 1 : 0)
          }}
        >
          Next
        </button>
      </h4>
    </div>
  )
}

export default ChartC
