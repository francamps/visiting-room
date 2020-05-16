import React from "react"

import "./Social.css"

const Social = ({ social }) => {
  if (social === "twitter") {
    return (
      <div className="social-icon linkedin">
        <svg
          x="0px"
          y="0px"
          width="63px"
          height="62px"
          viewBox="89 89 63 62"
          enable-background="new 89 89 63 62"
        >
          <path
            d="M119.88,89.91c-16.552,0-29.97,13.418-29.97,29.97s13.418,29.97,29.97,29.97s29.97-13.418,29.97-29.97
          S136.432,89.91,119.88,89.91z M135.915,111.679c-1.075,0.737-1.619,1.898-2.801,2.6c0.017,9.546-4.995,15.157-12.401,17.401
          c-4.129,1.252-10.739,0.946-13.401-1.6c-0.133,0-0.267,0-0.4,0c0.919-0.587,2.38-0.07,3.6-0.4c1.562-0.422,3.567-1.178,4.6-2.2
          c0.066,0,0.133,0,0.2,0c-0.479-0.721-2.259-0.737-3-1.2c-1.175-0.733-1.473-2.04-2.4-3c0.394-0.267,1.305-0.227,2-0.2
          c-0.566-1.075-2.285-1.405-3-2.4c-0.667-0.928-0.546-2.383-1.2-3.4c0-0.067,0-0.133,0-0.2c0.687,0.085,1.872,0.249,2.4,0.6
          c0.067,0,0.133,0,0.2,0c-0.329-0.761-0.992-0.803-1.4-1.4c-0.872-1.277-1.615-4.878-0.4-6.4c0-0.134,0-0.267,0-0.4
          c0.066,0,0.133,0,0.2,0c2.079,3.375,7.079,6.39,12.4,6.4c-0.105-3.875,1.136-6.189,3.801-7.201c2.43-0.922,5.327,0.222,6.201,1.6
          c1.448-0.049,2.823-0.451,3.6-1.2c0.134,0,0.268,0,0.4,0c-0.266,1.062-1,2.262-2,2.6c0,0.133,0,0.267,0,0.4
          c0.849-0.049,1.693-0.196,2.2-0.6c0.2,0,0.399,0,0.601,0C135.915,111.546,135.915,111.612,135.915,111.679z"
          />
        </svg>
      </div>
    )
  } else if (social === "instagram") {
    return (
      <div className="social-icon instagram">
        <svg
          x="0px"
          y="0px"
          width="61px"
          height="60px"
          viewBox="0 0 61 60"
          enable-background="new 0 0 61 60"
        >
          <g>
            <path
              fill="#FFC963"
              d="M40.807,27.4c0.283,2.119,0.557,4.381-0.199,6.401c-1.361,3.634-6.33,7.722-12.201,6
          		c-0.943-0.276-2.188-0.673-3-1.2c-3.414-2.217-4.531-5.705-4.201-11.201c-1,0-2,0-3,0c-0.027,4.074-0.803,12.709,0.801,15.203
          		c7.933,0,15.867,0,23.802,0c0.228-0.24,0.509-0.431,0.801-0.602c0.046-0.464,0.039-0.564,0.199-0.8
          		c0.017-3.402,0.685-11.14-0.2-13.802C42.674,27.4,41.74,27.4,40.807,27.4z"
            />
            <path
              fill="#FFC963"
              d="M43.009,23.4c0.2-0.133,0.399-0.267,0.6-0.4c0.072-1.979,0.509-5.085-1-5.6
          		c-0.829-0.541-3.368-0.232-4.601-0.2c-0.227,0.237-0.51,0.43-0.801,0.6c-0.129,0.345-0.039,0.196-0.199,0.4
          		c-0.012,1.868,0.02,3.897,0.398,5.2C38.602,23.723,41.873,24.307,43.009,23.4z"
            />
            <path
              fill="#FFC963"
              d="M33.406,36c2.963-1.104,5.76-5.555,3.4-9.4c-1.326-2.162-3.533-3.113-7.2-3
          		c-2.325,1.558-4.028,1.547-5,4.602C22.953,33.406,28.607,37.79,33.406,36z"
            />
            <path
              fill="#FFC963"
              d="M31.029,0.029C14.478,0.029,1.06,13.448,1.06,30s13.418,29.971,29.97,29.971C47.582,59.971,61,46.552,61,30
          		S47.582,0.029,31.029,0.029z M45.608,45.602c-2.293,1.627-8.562,0.801-12.2,0.801c-4.154,0-14.595,0.899-17.002-0.801
          		c-2.154-1.521-1.8-5.316-1.8-9c0-4.467,0-8.935,0-13.401c0-2.122-0.351-4.8,0.2-6.601c0.371-1.215,1.507-1.721,2.2-2.601
          		c0.55-0.058,1.416-0.142,1.8-0.399c6.266,0,12.534,0,18.801,0c2.75,0,6.346-0.371,8.001,0.799c1.884,1.332,1.802,4.148,1.802,7.401
          		c0,5.4,0,10.802,0,16.201C47.41,41.318,47.527,44.24,45.608,45.602z"
            />
          </g>
        </svg>
      </div>
    )
  }
}

export default Social