import React from "react"

import Timeline from "../components/Timeline/Timeline"
import TimelineOnePager from "../components/Timeline/TimelineOnePager"
import Layout from "../components/Layout"

const USE_ONE_PAGER = true

const TimelinePage = () => {
  return <Layout>{USE_ONE_PAGER ? <TimelineOnePager /> : <Timeline />}</Layout>
}

export default TimelinePage
