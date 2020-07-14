import React, { useEffect, useState, useRef } from "react"
import { scaleLinear, scaleTime } from "d3-scale"
import { select } from "d3-selection"
import { line, area } from "d3-shape"
import { curveMonotoneX } from "d3-shape"
import { easeCircleInOut } from "d3-ease"
import "d3-transition"

import { useInterval } from "../../utils/useInterval"

import "./chart.css"

const dataComs = [
  // 1972 population 3421
  { year0: 1972, yearF: 1980, label: "Edwards", value: 925 },
  { year0: 1980, yearF: 1984, label: "Treen", value: 40 },
  { year0: 1984, yearF: 1988, label: "Edwards", value: 325 },
  { year0: 1988, yearF: 1992, label: "Roemer", value: 65 },
  { year0: 1992, yearF: 1996, label: "Edwards", value: 152 },
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
  t: 0,
  l: 0,
  b: 30,
  r: 5,
}

const HEIGHT = 500
const WIDTH = 640
const TRANSITION_DURATION = 900

const ChartC = () => {
  const [step, setStep] = useState(0)
  const svgRef = useRef()
  const canvasRef = useRef()

  useInterval(() => {
    setStep(step < 2 ? step + 1 : 0)
  }, 4000)

  useEffect(() => {
    const w = canvasRef.current.getBoundingClientRect().width
    const h = (w * HEIGHT) / WIDTH
    const svg = select(svgRef.current)

    const pointsLifers = svg
      .selectAll("circle.lifers-point")
      .data([dataLifers[dataLifers.length - 1]])
    const pointsPops = svg
      .selectAll("circle.pops-point")
      .data([dataPops[dataPops.length - 1]])
    const pointsComs = svg
      .selectAll("circle.coms")
      .data([dataComs[dataComs.length - 1]])

    const xScale = scaleTime()
      .domain([1972, 2020])
      .range([m.l, w - m.r])

    const maxY = step === 2 ? 38000 : step === 1 ? 5000 : 1000
    const yScale = scaleLinear()
      .domain([0, maxY])
      .range([h - m.b, m.t])

    /** PRISON POPULATION & LIFERS */

    const path = area()
      .curve(curveMonotoneX)
      .x(d => xScale(d.yearF))
      .y1(d => yScale(d.value))
      .y0(yScale(0))

    const pathLine = line()
      .curve(curveMonotoneX)
      .x(d => xScale(d.yearF))
      .y(d => yScale(d.value))

    svg
      .selectAll("path.pops")
      .data([dataPops])
      .join("path")
      .attr("class", "pops")
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("d", path)
      .style("opacity", step > 1 ? 0.5 : 0.1)

    svg
      .selectAll("path.pops-line")
      .data([dataPops])
      .join("path")
      .attr("class", "pops-line")
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("d", pathLine)
      .style("opacity", step > 1 ? 1 : 0.1)

    pointsPops
      .join("circle")
      .attr("class", "pops-point")
      .attr("r", 2)
      .attr("cx", d => xScale(d.yearF))
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("cy", d => yScale(d.value))

    svg
      .selectAll("text.text-value-pops-label")
      .data([dataPops[dataPops.length - 1]])
      .join("text")
      .attr("class", "text-value-pops-label legend-label")
      .style("text-anchor", "end")
      .text(d => "Total prison population")
      .attr("x", d => xScale.range()[1])
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("y", d => yScale(d.value) + 15)

    svg
      .selectAll("text.text-pops-value")
      .data([dataPops[dataPops.length - 1]])
      .join("text")
      .attr("class", "text-pops-value")
      .text(d => d.value)
      .attr("x", d => xScale(d.yearF))
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("y", d => yScale(d.value) + 30)

    svg
      .selectAll("path.lifers")
      .data([dataLifers])
      .join("path")
      .attr("class", "lifers")
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("d", path)
      .style("opacity", step ? 0.5 : 0.1)
    svg
      .selectAll("path.lifers-line")
      .data([dataLifers])
      .join("path")
      .attr("class", "lifers-line")
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("d", pathLine)
      .style("opacity", step ? 1 : 0.1)

    pointsLifers
      .join("circle")
      .attr("class", "lifers-point")
      .attr("cx", d => xScale(d.yearF))
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("r", 2)
      .attr("cy", d => yScale(d.value))

    svg
      .selectAll("text.text-value")
      .data([dataLifers[dataLifers.length - 1]])
      .join("text")
      .attr("class", "text-value")
      .text(d => d.value)
      .attr("x", d => xScale(d.yearF))
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("y", d => yScale(d.value) - 15)

    svg
      .selectAll("text.text-value-label")
      .data([dataLifers[dataLifers.length - 1]])
      .join("text")
      .attr("class", "text-value-label legend-label")
      .style("text-anchor", "end")
      .text(d => "Lifers population")
      .attr("x", d => xScale(d.yearF))
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("y", d => yScale(d.value) - 35)

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
      .attr("stroke", "var(--clr-chart)")
      .transition()
      .ease(easeCircleInOut)
      .duration(600)
      .attr("d", pathComs)

    pointsComs
      .join("circle")
      .attr("class", "coms")
      .attr("cx", d => xScale(d.yearF))
      .attr("r", 2)
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("cy", d => yScale(d.value))

    svg
      .selectAll("text.labelComs")
      .data(dataComs)
      .join("text")
      .attr("class", "labelComs")
      .attr("x", d => xScale(d.yearF))
      .text(d => `${d.label}: ${d.value}`)
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("y", d => (!step ? yScale(d.value) - 20 : h - 15))

    svg
      .selectAll("text.yearComs")
      .data(dataComs)
      .join("text")
      .attr("class", "yearComs")
      .join("text")
      .attr("x", d => xScale(d.yearF))
      .text(d => `${d.year0} - ${d.yearF}`)
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("y", d => (!step ? yScale(d.value) - 5 : h))

    svg
      .selectAll("text.text-coms-label")
      .data([dataComs[dataComs.length - 1]])
      .join("text")
      .attr("class", "text-coms-label legend-label")
      .style("text-anchor", "end")
      .text(d => "Commutations")
      .attr("x", d => xScale(d.yearF))
      .transition()
      .ease(easeCircleInOut)
      .duration(TRANSITION_DURATION)
      .attr("y", d => (!step ? yScale(d.value) - 40 : yScale(d.value) - 15))

    svg.attr("width", w).attr("height", h)
  }, [step])

  return (
    <div className="chart-wrap" ref={canvasRef}>
      <svg width={WIDTH} height={HEIGHT} className="" ref={svgRef}></svg>
      <h4 className="title">Commutations vs prison population</h4>
    </div>
  )
}

export default ChartC
