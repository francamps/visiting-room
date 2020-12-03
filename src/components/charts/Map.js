import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import "./Map.css"

const MapboxGLMap = ({ style }) => {
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)

  useEffect(() => {
    // TODO: CHANGE THIS IN PRODUCTION!
    // mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGhldmlzaXRpbmdyb29tbGEiLCJhIjoiY2thdjNod2dhMWttMzMwcDA2dGNpNnZxZSJ9.hCg9svJZ1LaRtt7vfG4M1g"

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/thevisitingroomla/ckav68oup7mib1it7pc3zja0p", // stylesheet location
        center: [-91.5939039, 30.9554369],
        zoom: 6,
        interactive: false,
      })

      map.on("load", () => {
        setMap(map)
        map.resize()

        // create a HTML element for each feature
        var el = document.createElement("div")
        el.className = "marker"
        el.innerHTML = "<div class='marker-point'/>"

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat([-91.5939039, 30.9554369]).addTo(map)

        var label = document.createElement("p")
        label.innerText = "Louisiana State Penitentiary"
        el.insertAdjacentElement("afterend", label)
      })
    }

    if (!map) initializeMap({ setMap, mapContainer })
  }, [map])

  return <div ref={el => (mapContainer.current = el)} style={{ ...style }} />
}

export default MapboxGLMap
