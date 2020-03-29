import React, { useEffect, useRef } from "react"
import { scaleLinear, scaleTime } from "d3-scale"
import { select } from "d3-selection"
import { line, area } from "d3-shape"

const data = [
  // 1972 population 3421
  { year0: 1972, yearF: 1980, label: "Edwards", value: 925, population: 8889 },
  { year0: 1980, yearF: 1984, label: "Treen", value: 40, population: 13659 },
  { year0: 1984, yearF: 1988, label: "Edwards", value: 325, population: 16242 },
  { year0: 1988, yearF: 1992, label: "Roemer", value: 65, population: 19986 },
  { year0: 1992, yearF: 1996, label: "Edwards", value: 0, population: 25447 },
  { year0: 1996, yearF: 2004, label: "Foster", value: 50, population: 35885 },
  { year0: 2004, yearF: 2008, label: "Blanco", value: 125, population: 37567 },
  { year0: 2008, yearF: 2016, label: "Jindal", value: 0, population: 36533 },
  { year0: 2016, yearF: 2020, label: "Edwards", value: 34, population: 34171 },
]

const dataLifers = [
  { yearF: 1972, population: 143 },
  { yearF: 1975, population: 382 },
  { yearF: 1980, population: 802 },
  { yearF: 1985, population: 1445 },
  { yearF: 1990, population: 2039 },
  { yearF: 1995, population: 2595 },
  { yearF: 2000, population: 3150 },
  { yearF: 2005, population: 4034 },
  { yearF: 2015, population: 4850 },
  { yearF: 2020, population: 4693 },
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
  .domain([0, 5000])
  .range([HEIGHT - m.t, m.b])

const ChartB = () => {
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)
    const points = svg.selectAll("circle").data(data)

    const pathLineFill = area()
      .x(d => xScale(d.yearF))
      .y1(d => yScale(d.population))
      .y0(d => yScale(0))

    const pathLine = line()
      .x(d => xScale(d.yearF))
      .y(d => yScale(d.population))

    /*svg
      .append("path")
      .datum([{ yearF: 1972, population: 3421 }, ...data])
      .attr("class", "population-line")
      .attr("fill", "var(--clr-secondary)")
      .attr("fill-opacity", 0.0)
      .style("stroke", "var(--clr-secondary)")
      .style("stroke-width", 2)
      .attr("opacity", 0.5)
      .attr("d", pathLine)

    svg
      .append("path")
      .datum([{ yearF: 1972, population: 3421 }, ...data])
      .attr("class", "population-line")
      .attr("fill", "var(--clr-secondary)")
      .attr("fill-opacity", 0.2)
      .style("stroke", "var(--clr-secondary)")
      .style("stroke-width", 0)
      .attr("opacity", 0.5)
      .attr("d", pathLineFill)*/

    svg
      .append("path")
      .datum(dataLifers)
      .attr("class", "lifers-line")
      .attr("fill", "var(--clr-black)")
      .attr("fill-opacity", 0.2)
      .style("stroke", "var(--clr-black)")
      .style("stroke-width", 0)
      .attr("opacity", 0.5)
      .attr("d", pathLineFill)

    svg
      .append("path")
      .datum(dataLifers)
      .attr("class", "lifers-line")
      .attr("fill", "var(--clr-black)")
      .attr("fill-opacity", 0.0)
      .style("stroke", "var(--clr-black)")
      .style("stroke-width", 2)
      .attr("opacity", 0.5)
      .attr("d", pathLine)

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
          .attr("fill", "var(--clr-chart)")
          .attr("fill-opacity", 0.7)
          .attr("stroke", "none")
          //.attr("opacity", 0.5)
          .attr("d", path)
      })
      .attr("x1", d => xScale(d.year0))
      .attr("x2", d => xScale(d.yearF))
      .attr("y1", d => yScale(0))
      .attr("y2", d => yScale(d.value))
      .style("stroke", "var(--clr-chart)")
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
      .style("stroke", "var(--clr-chart)")
      .style("stroke-width", 2)
      .style("stroke-dasharray", "2px 5px")
      .style("opacity", 0.5)

    points
      .join("circle")
      .attr("cx", d => xScale(d.yearF))
      .attr("cy", d => yScale(d.value))
      .attr("r", 1)
      .style("fill", "white")
      .style("fill-opacity", 1)
      .style("stroke", "var(--clr-chart)")
      .style("stroke-width", 2)

    svg
      .selectAll("text.label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("x", d => xScale(d.yearF))
      .attr("y", d => yScale(d.value) - 28)
      .text(d => d.label)
      .style("fill", "black")
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
      .style("fill", "black")
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
      .style("fill", "black")
      .style("text-anchor", "middle")
      .style("font-family", "GTEesti")
      .style("font-weight", "100")
      .style("font-size", "var(--font-xsmall)")
  }, [])

  return <svg width={WIDTH} height={HEIGHT} className="" ref={svgRef}></svg>
}

export default ChartB
