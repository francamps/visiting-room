import React from 'react';

import "./ViewIcons.css";

const ViewIcons = ({view, setView}) => {
  return (
    <div className="views" style={{ display: "flex", flexDirection: "row", position: "fixed", right: 40, top: 60 }}>
    <div className={`view view-0 ${view === 0 ? "active": ""}`} style={{ marginRight: 20 }}>
      <svg width="25px" height="22px" viewBox="0 0 25 22" onClick={() => { setView(0) }}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Who-to-visit" transform="translate(-1293.000000, -85.000000)" stroke="#FFFFFF">
                <g id="Icon---Single-view" transform="translate(1293.000000, 85.000000)">
                    <line x1="0.5" y1="6.77777778" x2="13.5" y2="6.77777778" id="Line-2-Copy-4" strokeLinecap="round" strokeLinejoin="round"></line>
                    <line x1="0.5" y1="0.777777778" x2="11.5" y2="0.777777778" id="Line-2-Copy-5" strokeLinecap="round" strokeLinejoin="round"></line>
                    <line x1="0.5" y1="9.77777778" x2="6.5" y2="9.77777778" id="Line-2-Copy-6" strokeLinecap="round" strokeLinejoin="round"></line>
                    <line x1="0.5" y1="3.77777778" x2="17.5" y2="3.77777778" id="Line-2-Copy-9" strokeLinecap="round" strokeLinejoin="round"></line>
                    <rect id="Rectangle-Copy-12" x="9.5" y="9.5" width="15" height="12"></rect>
                </g>
            </g>
        </g>
      </svg>
    </div>
    <div className={`view view-1 ${view === 1 ? "active": ""}`} style={{ marginRight: 20 }}>
      <svg width="27px" height="22px" viewBox="0 0 27 22" onClick={() => { setView(1) }}>
        <g  stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Who-to-visit" transform="translate(-1342.000000, -85.000000)" stroke="#FFFFFF">
                <g id="Icon---Thumbnails" transform="translate(1342.000000, 85.000000)">
                    <g id="Icon---List-view-Copy">
                        <g id="View-2">
                            <rect id="Rectangle-Copy-12" x="0.5" y="0.5" width="5.25" height="4"></rect>
                        </g>
                        <g id="View-2-Copy">
                            <line x1="0.5" y1="6.5" x2="5.5" y2="6.5" id="Line-2-Copy-4" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="10.5" y1="6.5" x2="15.5" y2="6.5" id="Line-2-Copy-7" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="20.5" y1="6.5" x2="25.5" y2="6.5" id="Line-2-Copy-10" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="0.5" y1="8.5" x2="3.5" y2="8.5" id="Line-2-Copy-4" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="10.5" y1="8.5" x2="13.5" y2="8.5" id="Line-2-Copy-8" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="20.5" y1="8.5" x2="23.5" y2="8.5" id="Line-2-Copy-11" strokeLinecap="round" strokeLinejoin="round"></line>
                            <rect id="Rectangle-Copy-14" x="20.5" y="0.5" width="5.25" height="4"></rect>
                            <rect id="Rectangle-Copy-13" x="10.5" y="0.5" width="5.25" height="4"></rect>
                        </g>
                    </g>
                    <g id="Icon---List-view-Copy-2" transform="translate(0.000000, 13.000000)">
                        <g id="View-2">
                            <rect id="Rectangle-Copy-12" x="0.5" y="0.5" width="5.25" height="4"></rect>
                        </g>
                        <g id="View-2-Copy">
                            <line x1="0.5" y1="6.5" x2="5.5" y2="6.5" id="Line-2-Copy-4" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="10.5" y1="6.5" x2="15.5" y2="6.5" id="Line-2-Copy-7" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="20.5" y1="6.5" x2="25.5" y2="6.5" id="Line-2-Copy-10" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="0.5" y1="8.5" x2="3.5" y2="8.5" id="Line-2-Copy-4" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="10.5" y1="8.5" x2="13.5" y2="8.5" id="Line-2-Copy-8" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="20.5" y1="8.5" x2="23.5" y2="8.5" id="Line-2-Copy-11" strokeLinecap="round" strokeLinejoin="round"></line>
                            <rect id="Rectangle-Copy-14" x="20.5" y="0.5" width="5.25" height="4"></rect>
                            <rect id="Rectangle-Copy-13" x="10.5" y="0.5" width="5.25" height="4"></rect>
                        </g>
                    </g>
                </g>
            </g>
        </g>
      </svg>
    </div>
    <div className={`view view-2 ${view === 2 ? "active": ""}`}>
      <svg width="26px" height="22px" viewBox="0 0 26 22" onClick={() => { setView(2) }}>
          <g id="201908---The-Visiting-Room-II" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Who-to-visit" transform="translate(-1393.000000, -85.000000)" stroke="#FFFFFF">
                  <g id="Icon---List-view" transform="translate(1393.000000, 85.000000)">
                      <g id="View-2">
                          <line x1="7.95454545" y1="1.11111111" x2="18.75" y2="1.11111111" id="Line-2-Copy-4" strokeLinecap="round" strokeLinejoin="round"></line>
                          <line x1="7.95454545" y1="3.88888889" x2="25" y2="3.88888889" id="Line-2-Copy-9" strokeLinecap="round" strokeLinejoin="round"></line>
                          <rect id="Rectangle-Copy-12" x="0.5" y="0.5" width="5.25" height="4"></rect>
                      </g>
                      <g id="View-2-Copy" transform="translate(0.000000, 9.000000)">
                          <line x1="7.95454545" y1="1.11111111" x2="18.75" y2="1.11111111" id="Line-2-Copy-4" strokeLinecap="round" strokeLinejoin="round"></line>
                          <line x1="7.95454545" y1="3.88888889" x2="25" y2="3.88888889" id="Line-2-Copy-9" strokeLinecap="round" strokeLinejoin="round"></line>
                          <rect id="Rectangle-Copy-12" x="0.5" y="0.5" width="5.25" height="4"></rect>
                      </g>
                      <g id="View-2-Copy-2" transform="translate(0.000000, 17.000000)">
                          <line x1="7.95454545" y1="1.11111111" x2="18.75" y2="1.11111111" id="Line-2-Copy-4" strokeLinecap="round" strokeLinejoin="round"></line>
                          <line x1="7.95454545" y1="3.88888889" x2="25" y2="3.88888889" id="Line-2-Copy-9" strokeLinecap="round" strokeLinejoin="round"></line>
                          <rect id="Rectangle-Copy-12" x="0.5" y="0.5" width="5.25" height="4"></rect>
                      </g>
                  </g>
              </g>
          </g>
      </svg>
    </div></div>
  )
}

export default ViewIcons;