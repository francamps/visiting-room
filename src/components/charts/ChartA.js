import React, { useEffect, useRef } from "react"
import { scaleLinear, scaleTime } from "d3-scale"
import { select } from "d3-selection"
import { line, area } from "d3-shape"

const data = [
  { year: 1970, d: 143 },
  { year: 1975, d: 382 },
  { year: 1980, d: 802 },
  { year: 1985, d: 1445 },
  { year: 1990, d: 2039 },
  { year: 1995, d: 2595 },
  { year: 2000, d: 3150 },
  { year: 2005, d: 4034 },
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
  .domain([1970, 2005])
  .range([m.l, WIDTH - m.r])

const yScale = scaleLinear()
  .domain([0, 4500])
  .range([HEIGHT - m.t, m.b])

const ChartA = () => {
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)
    const points = svg.selectAll("circle").data(data)

    const path = area()
      .x(d => xScale(d.year))
      .y1(d => yScale(d.d))
      .y0(yScale(0))

    const pathLine = line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.d))

    svg
      .append("path")
      .datum(data)
      .attr("fill", "var(--clr-primary)")
      .attr("fill-opacity", 0.2)
      .attr("stroke", "none")
      .attr("opacity", 0.5)
      .attr("d", path)

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "var(--clr-primary)")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.5)
      .attr("d", pathLine)

    points
      .join("circle")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.d))
      .attr("r", 4)
      .style("fill", "white")
      .style("stroke", "var(--clr-primary")
      .style("stroke-width", 2)

    svg
      .selectAll("text.value")
      .data(data)
      .join("text")
      .attr("class", "value")
      .attr("x", d => xScale(d.year))
      .attr("y", d => yScale(d.d) - 15)
      .text(d => d.d)
      .style("fill", "black")
      .style("text-anchor", "middle")
      .style("font-family", "GTEesti")
      .style("font-weight", "100")
      .style("font-size", "var(--font-xsmall)")

    svg
      .selectAll("text.year")
      .data(data)
      .join("text")
      .attr("class", "year")
      .join("text")
      .attr("x", d => xScale(d.year))
      .attr("y", d => HEIGHT - 5)
      .text(d => d.year)
      .style("fill", "black")
      .style("text-anchor", "middle")
      .style("font-family", "GTEesti")
      .style("font-weight", "100")
      .style("font-size", "var(--font-xsmall)")

    svg
      .selectAll("line")
      .data(data)
      .join("line")
      .attr("x1", d => xScale(d.year))
      .attr("x2", d => xScale(d.year))
      .attr("y1", d => yScale(d.d) + 2)
      .attr("y2", d => HEIGHT - m.b)
      .style("stroke", "var(--clr-primary")
      .style("stroke-width", 2)
      .style("stroke-dasharray", "2px 5px")
      .style("opacity", 0.5)
  }, [])

  return <svg width={WIDTH} height={HEIGHT} className="" ref={svgRef}></svg>
}

export default ChartA