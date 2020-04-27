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
  { year: 2015, d: 4850 },
  { year: 2020, d: 4693 },
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

const ChartA = () => {
  const svgRef = useRef()
  const canvasRef = useRef()

  useEffect(() => {
    const w = canvasRef.current.getBoundingClientRect().width
    const h = (w * HEIGHT) / WIDTH
    const svg = select(svgRef.current)
    const points = svg.selectAll("circle").data(data)

    const xScale = scaleTime()
      .domain([1970, 2020])
      .range([m.l, w - m.r])

    const yScale = scaleLinear()
      .domain([0, 5000])
      .range([h - m.t, m.b])

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
      .style("fill", "var(--clr-primary)")
      .attr("fill-opacity", 0.2)
      .attr("stroke", "none")
      .attr("opacity", 0.5)
      .attr("d", path)

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "var(--clr-chart)")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.5)
      .attr("d", pathLine)

    points
      .join("circle")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.d))
      .attr("r", 4)
      .style("fill", "white")
      .style("stroke", "var(--clr-chart)")
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
      .attr("y", d => h - 5)
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
      .attr("y2", d => h - m.b)
      .style("stroke", "var(--clr-chart)")
      .style("stroke-width", 2)
      .style("stroke-dasharray", "2px 5px")
      .style("opacity", 0.5)

    svg.attr("width", w).attr("height", h)
  }, [])

  return (
    <div className="chart-wrap" ref={canvasRef}>
      <svg width={WIDTH} height={HEIGHT} className="" ref={svgRef}></svg>
      <h4 className="title">People serving life without parole in Louisiana</h4>
    </div>
  )
}

export default ChartA
