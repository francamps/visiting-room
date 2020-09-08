import React from "react"

import Timeline from "../components/Timeline/Timeline"
import TimelineOnePager from "../components/Timeline/TimelineOnePager"

const USE_ONE_PAGER = true

const TimelinePage = () => {
  return USE_ONE_PAGER ? <TimelineOnePager /> : <Timeline />
}

export default TimelinePage
