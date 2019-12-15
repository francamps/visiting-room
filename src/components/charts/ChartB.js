import React, { useEffect, useRef } from "react"
import { scaleLinear, scaleTime } from "d3-scale"
import { select } from "d3-selection"
import { area } from "d3-shape"

const data = [
  { year0: 1972, yearF: 1980, label: "Edwards", value: 925 },
  { year0: 1980, yearF: 1984, label: "Treen", value: 40 },
  { year0: 1984, yearF: 1988, label: "Edwards", value: 325 },
  { year0: 1988, yearF: 1992, label: "Roemer", value: 65 },
  { year0: 1992, yearF: 1996, label: "Edwards", value: 0 },
  { year0: 1996, yearF: 2004, label: "Foster", value: 50 },
  { year0: 2004, yearF: 2008, label: "Blanco", value: 125 },
  { year0: 2008, yearF: 2016, label: "Jindal", value: 0 },
  { year0: 2016, yearF: 2020, label: "Edwards", value: 23 },
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

const xScale = scaleTime()
  .domain([1972, 2020])
  .range([m.l, WIDTH - m.r])

const yScale = scaleLinear()
  .domain([0, 1000])
  .range([HEIGHT - m.t, m.b])

const ChartB = () => {
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)
    const points = svg.selectAll("circle").data(data)

    const path = area()
      .x(d => xScale(d.year))
      .y1(d => yScale(d.value))
      .y0(yScale(0))

    svg
      .selectAll("line")
      .data(data)
      .join("line")
      .each(d => {
        svg
          .append("path")
          .datum([
            { year: d.year0, value: 0 },
            { year: d.yearF, value: d.value },
          ])
          .attr("class", `year-${d.yearF}`)
          .attr("fill", "var(--clr-primary)")
          .attr("fill-opacity", 0.2)
          .attr("stroke", "none")
          .attr("opacity", 0.5)
          .attr("d", path)
      })
      .attr("x1", d => xScale(d.year0))
      .attr("x2", d => xScale(d.yearF))
      .attr("y1", d => yScale(0))
      .attr("y2", d => yScale(d.value))
      .style("stroke", "var(--clr-primary")
      .style("stroke-width", 2)

    svg
      .selectAll("line.dotted")
      .data(data)
      .join("line")
      .attr("class", "dotted")
      .attr("x1", d => xScale(d.yearF))
      .attr("x2", d => xScale(d.yearF))
      .attr("y1", d => yScale(d.value))
      .attr("y2", HEIGHT - m.b)
      .style("stroke", "var(--clr-primary")
      .style("stroke-width", 2)
      .style("stroke-dasharray", "2px 5px")
      .style("opacity", 0.5)

    points
      .join("circle")
      .attr("cx", d => xScale(d.yearF))
      .attr("cy", d => yScale(d.value))
      .attr("r", 4)
      .style("fill", "black")
      .style("stroke", "var(--clr-primary")
      .style("stroke-width", 2)

    svg
      .selectAll("text.label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("x", d => xScale(d.yearF))
      .attr("y", d => yScale(d.value) - 28)
      .text(d => d.label)
      .style("fill", "white")
      .style("text-anchor", "end")
      .style("font-family", "GTEesti")
      .style("font-weight", "100")
      .style("opacity", 0.75)
      .style("font-size", "var(--font-xsmall)")

    svg
      .selectAll("text.value")
      .data(data)
      .join("text")
      .attr("class", "value")
      .attr("x", d => xScale(d.yearF))
      .attr("y", d => yScale(d.value) - 10)
      .text(d => d.value)
      .style("fill", "white")
      .style("text-anchor", "end")
      .style("font-family", "GTEesti")
      .style("font-weight", "700")
      .style("font-size", "var(--font-xsmall)")

    svg
      .selectAll("text.year")
      .data(data)
      .join("text")
      .attr("class", "year")
      .join("text")
      .attr("x", d => xScale(d.year0))
      .attr("y", HEIGHT)
      .text(d => d.year0)
      .style("fill", "white")
      .style("text-anchor", "middle")
      .style("font-family", "GTEesti")
      .style("font-weight", "100")
      .style("font-size", "var(--font-xsmall)")
  }, [])

  return <svg width={WIDTH} height={HEIGHT} className="" ref={svgRef}></svg>
}

export default ChartB
