import React from "react"

const EnterIcon = ({ isHover }) => (
  <svg width="27px" height="27px" viewBox="0 0 27 27">
    <g
      id="Typography---UI-Comp"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g
        id="Notes-Copy"
        transform="translate(-343.000000, -680.000000)"
        stroke={!isHover ? "var(--clr-off-white)" : "var(--clr-primary)"}
        stroke-width="2"
      >
        <g id="Group" transform="translate(344.000000, 681.000000)">
          <line x1="0.5" y1="0.5" x2="0.5" y2="24.5" id="Line-6"></line>
          <line x1="25" y1="0.5" x2="25" y2="24.5" id="Line-6-Copy"></line>
          <line x1="15" y1="24.5" x2="15" y2="16.5" id="Line-7-Copy"></line>
          <line x1="11" y1="24.5" x2="11" y2="16.5" id="Line-7-Copy-2"></line>
          <line x1="11" y1="16.5" x2="1" y2="16.5" id="Line-8"></line>
          <line x1="25" y1="16.5" x2="15" y2="16.5" id="Line-8-Copy"></line>
        </g>
      </g>
    </g>
  </svg>
)
export default EnterIcon
