import React, { useState } from "react"

const FullScreen = ({ enabled = false, color = "#ffffff" }) => {
  const [isHover, setHover] = useState(false)

  return enabled ? (
    <svg
      width="23px"
      height="22px"
      viewBox="0 0 23 22"
      version="1.1"
      style={{ opacity: isHover ? 1 : 0.8, transition: "opacity 0.4s" }}
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseOut={() => {
        setHover(false)
      }}
    >
      <g
        id="Typography---UI-Comp"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinejoin="round"
      >
        <g id="Notes-Copy" transform="translate(-1100.000000, -508.000000)">
          <g id="Group-3-Copy-3" transform="translate(1101.000000, 509.000000)">
            <rect
              id="Rectangle"
              stroke="#000000"
              fill="#000000"
              x="-0.5"
              y="-0.5"
              width="22"
              height="21"
            ></rect>
            <g
              id="Group-4"
              transform="translate(1.500000, 2.000000)"
              stroke={color}
              strokeLinecap="round"
              strokeWidth="2"
            >
              <line x1="1" y1="6" x2="7" y2="6" id="Line-9-Copy-5"></line>
              <line
                x1="4"
                y1="3"
                x2="10"
                y2="3"
                id="Line-9-Copy-8"
                transform="translate(7.000000, 3.000000) rotate(90.000000) translate(-7.000000, -3.000000) "
              ></line>
              <line
                x1="11.5"
                y1="9.5"
                x2="17.5"
                y2="9.5"
                id="Line-9-Copy-10"
              ></line>
              <line
                x1="8.5"
                y1="12.5"
                x2="14.5"
                y2="12.5"
                id="Line-9-Copy-11"
                transform="translate(11.500000, 12.500000) rotate(90.000000) translate(-11.500000, -12.500000) "
              ></line>
              <line x1="11.5" y1="6" x2="17.5" y2="6" id="Line-9-Copy-4"></line>
              <line
                x1="8.5"
                y1="3"
                x2="14.5"
                y2="3"
                id="Line-9-Copy-7"
                transform="translate(11.500000, 3.000000) rotate(90.000000) translate(-11.500000, -3.000000) "
              ></line>
              <line x1="1" y1="9.5" x2="7" y2="9.5" id="Line-9-Copy-6"></line>
              <line
                x1="4"
                y1="12.5"
                x2="10"
                y2="12.5"
                id="Line-9-Copy-9"
                transform="translate(7.000000, 12.500000) rotate(90.000000) translate(-7.000000, -12.500000) "
              ></line>
            </g>
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <>
      <svg
        width="25px"
        height="24px"
        viewBox="0 0 25 24"
        version="1.1"
        style={{ opacity: isHover ? 1 : 0.8, transition: "opacity 0.4s" }}
        onMouseOver={() => {
          setHover(true)
        }}
        onMouseOut={() => {
          setHover(false)
        }}
      >
        <g
          id="Typography---UI-Comp"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          stroke-linejoin="round"
        >
          <g id="Notes-Copy" transform="translate(-1074.000000, -507.000000)">
            <g
              id="Enable-fullscreen"
              transform="translate(1074.000000, 508.000000)"
            >
              <rect
                id="Rectangle"
                stroke="#000000"
                fill="#000000"
                x="1.5"
                y="0.5"
                width="22"
                height="21"
              ></rect>
              <g
                id="Group-4"
                transform="translate(0.500000, 0.000000)"
                stroke="#FFFFFF"
                stroke-linecap="round"
                stroke-width="2"
              >
                <line
                  x1="1.14285714"
                  y1="0.5"
                  x2="8.85714286"
                  y2="0.5"
                  id="Line-9-Copy-2"
                ></line>
                <line
                  x1="-2.5"
                  y1="4.5"
                  x2="5.5"
                  y2="4.5"
                  id="Line-9-Copy-2"
                  transform="translate(1.500000, 4.500000) rotate(90.000000) translate(-1.500000, -4.500000) "
                ></line>
                <line
                  x1="-2.5"
                  y1="17.5"
                  x2="5.5"
                  y2="17.5"
                  id="Line-9-Copy-7"
                  transform="translate(1.500000, 17.500000) rotate(90.000000) translate(-1.500000, -17.500000) "
                ></line>
                <line
                  x1="1.14285714"
                  y1="21.5"
                  x2="8.85714286"
                  y2="21.5"
                  id="Line-9-Copy-4"
                ></line>
                <line
                  x1="15.1428571"
                  y1="21.5"
                  x2="22.8571429"
                  y2="21.5"
                  id="Line-9-Copy-5"
                ></line>
                <line
                  x1="18.5"
                  y1="17.5"
                  x2="26.5"
                  y2="17.5"
                  id="Line-9-Copy-8"
                  transform="translate(22.500000, 17.500000) rotate(90.000000) translate(-22.500000, -17.500000) "
                ></line>
                <line
                  x1="18.5"
                  y1="4.5"
                  x2="26.5"
                  y2="4.5"
                  id="Line-9-Copy-9"
                  transform="translate(22.500000, 4.500000) rotate(90.000000) translate(-22.500000, -4.500000) "
                ></line>
                <line
                  x1="15.1428571"
                  y1="0.5"
                  x2="22.8571429"
                  y2="0.5"
                  id="Line-9-Copy-6"
                ></line>
              </g>
            </g>
          </g>
        </g>
      </svg>

      {
        null /*<svg
      width="23px"
      height="22px"
      viewBox="0 0 23 22"
      version="1.1"
      style={{ opacity: isHover ? 1 : 0.8, transition: "opacity 0.4s" }}
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseOut={() => {
        setHover(false)
      }}
    >
      <g
        id="Typography---UI-Comp"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinejoin="round"
      >
        <g id="Notes-Copy" transform="translate(-1075.000000, -508.000000)">
          <g id="Group-3-Copy-2" transform="translate(1076.000000, 509.000000)">
            <rect
              id="Rectangle"
              stroke="#000000"
              fill="#000000"
              x="-0.5"
              y="-0.5"
              width="22"
              height="21"
            ></rect>
            <g
              id="Group-4"
              transform="translate(0.500000, 1.000000)"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeWidth="2"
            >
              <line x1="1.5" y1="17" x2="7.5" y2="17" id="Line-9-Copy-4"></line>
              <line
                x1="12.5"
                y1="17"
                x2="18.5"
                y2="17"
                id="Line-9-Copy-5"
              ></line>
              <line x1="12.5" y1="1" x2="18.5" y2="1" id="Line-9-Copy-6"></line>
              <line x1="1.5" y1="1" x2="7.5" y2="1" id="Line-9-Copy-2"></line>
              <line
                x1="-1.5"
                y1="4"
                x2="4.5"
                y2="4"
                id="Line-9-Copy-2"
                transform="translate(1.500000, 4.000000) rotate(90.000000) translate(-1.500000, -4.000000) "
              ></line>
              <line
                x1="-1.5"
                y1="14"
                x2="4.5"
                y2="14"
                id="Line-9-Copy-7"
                transform="translate(1.500000, 14.000000) rotate(90.000000) translate(-1.500000, -14.000000) "
              ></line>
              <line
                x1="15.5"
                y1="14"
                x2="21.5"
                y2="14"
                id="Line-9-Copy-8"
                transform="translate(18.500000, 14.000000) rotate(90.000000) translate(-18.500000, -14.000000) "
              ></line>
              <line
                x1="15.5"
                y1="4"
                x2="21.5"
                y2="4"
                id="Line-9-Copy-9"
                transform="translate(18.500000, 4.000000) rotate(90.000000) translate(-18.500000, -4.000000) "
              ></line>
            </g>
          </g>
        </g>
      </g>
    </svg>*/
      }
    </>
  )
}

export default FullScreen
