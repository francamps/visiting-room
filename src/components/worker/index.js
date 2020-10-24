// worker.js

export default () => {
  /* eslint-disable-next-line no-restricted-globals */
  self.files = []

  /* eslint-disable-next-line no-restricted-globals */
  self.onmessage = event => {
    /* eslint-disable-next-line no-restricted-globals */
    self.postMessage({ msg: "RECEIVED" })

    if (event.data.msg === "LOADED") {
      /* eslint-disable-next-line no-restricted-globals */
      self.files = event.data.files
      /* eslint-disable-next-line no-restricted-globals */
      self.postMessage({ msg: "LOADED_IN_WW", files: self.files })
    }

    if (event.data.msg === "SEARCH") {
      /* eslint-disable-next-line no-restricted-globals */
      const search = event.data.search
      const results = []
      /* eslint-disable-next-line no-restricted-globals */
      event.data.files.forEach((file, idx) => {
        const transcript = Object.values(file)[0]
        const thisResults = transcript.filter(paragraph => {
          return paragraph.content.includes(search)
        })
        if (thisResults.length) {
          /* eslint-disable-next-line no-restricted-globals */
          results.push({ [Object.keys(file)[0]]: thisResults })
        }
      })
      /* eslint-disable-next-line no-restricted-globals */
      self.postMessage({ msg: "SEARCH_DONE", results })
    }
  }
}
