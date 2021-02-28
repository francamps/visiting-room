import React, { useEffect, useState, useReducer } from "react"
import capitalize from "lodash/capitalize"
import "./FilterAndSearch.css"

import worker from "./worker/index.js"
import WebWorker from "./worker/workerSetup"

const allTranscripts = [
  "aaron_brent",
  "adonis_brooks",
  "albert_lavalais",
  "allen_pharr",
  "alvin_catchings",
  "anthony_bascle",
  "anthony_hingle",
  "archie_tyner",
  "arthur_carter",
  "chadwick_tate",
  "charles_amos",
  "chris_montague",
  "chris_phillips",
  "chuck_unger",
  "cleothus_price",
  "dannie_johnson",
  "darnell_craft",
  "danny_sermon",
  "darwin_willie",
  "darren_james",
  "daryl_waters",
  "daryl_evans",
  "donahue_smith",
  "david_chenevert",
  "elliott_guilbeau",
  "edbert_simmons",
  "ernest_mcgee",
  "eric_taylor",
  "frank_green",
  "everett_offray",
  "gordon_newman",
  "george_crawford",
  "hannibal_stanfield",
  "gregory_alcindor",
  "isaiah_diggs",
  "hayward_jones",
  "james_refuge",
  "jack_segura",
  "jeffrey_hillburn",
  "jarrod_lanclow",
  "jerome_derricks",
  "jeffrey_nelson",
  "jerry_lewis",
  "jerry_brown",
  "jimmy_robinson",
  "jerry_williams",
  "john_sheehan",
  "jimmy_williams",
  "julius_holden",
  "juan_matthews",
  "kendrick_fisher",
  "keith_byes",
  "kennedy_thompson",
  "kendrick_howard",
  "kenneth_mcgee",
  "kenneth_hill",
  "kevin_king",
  "kenneth_woodburn",
  "kuantau_reeder",
  "kirt_hall",
  "lawrence_peters",
  "lawrence_kelly",
  "levelle_tolliver",
  "lawson_strickland",
  "marcus_artis",
  "manuel_nelson",
  "merlin_renard",
  "melvin_davis",
  "michael_thomas",
  "michael_doggett",
  "myron_smith",
  "monte_white",
  "neal_spencer",
  "nadaedrick_campbell",
  "patrick_johnson",
  "norman_dozier",
  "paul_mayho",
  "patrick_lucien",
  "randy_thomas",
  "ralph_dawson",
  "ricky_bennett",
  "raymond_flank",
  "ron_hicks",
  "robert_juarbe",
  "sammie_robinson",
  "ron_wiggins",
  "sherman_singleton",
  "shawn_gaspard",
  "solomon_birdsong",
  "sidney_anderson",
  "steven_garner",
  "steve_evans",
  "terrence_guy",
  "surge_sherman",
  "terry_pierce",
  "terry_jones",
  "theortric_givens",
  "terry_west",
  "tommy_floyd",
  "tommy_cage",
  "troy_west",
  "troy_andrews",
  "walter_goodwin",
  "vashon_kelly",
  "wilford_guy",
  "walter_reed",
  "winfred_davenport",
  "william_hall",
]

const FilterAndSearchResults = ({
  searchWords,
  setLoadingSearchResults,
  setSearchResults,
}) => {
  const [files, dispatchFiles] = useReducer((state, action) => {
    return [state, action].flat()
  }, [])
  const [results, setResults] = useState([])

  const searchWorker = new WebWorker(worker)
  searchWorker.onerror = err => err
  searchWorker.onmessage = event => {
    if (event.data.msg === "SEARCH_DONE") {
      setResults(event.data.results)
      setLoadingSearchResults(false)
    }
  }

  const searchResultsWW = () => {
    if (files.length) {
      searchWorker.postMessage({
        msg: "SEARCH",
        search: searchWords,
        files,
      })
    }
  }

  useEffect(() => {
    setLoadingSearchResults(true)
    allTranscripts.forEach(transFile => {
      import("../content/transcripts/" + transFile + ".json").then(cont => {
        dispatchFiles({ [transFile]: cont.transcript })
      })
    })
  }, [])

  useEffect(() => {
    if (files.length === allTranscripts.length) {
      searchWorker.postMessage({ msg: "LOADED", files })
      searchResultsWW()
    } else {
      setLoadingSearchResults(true)
    }
  }, [files.length])

  useEffect(() => {
    if (searchWords) {
      setLoadingSearchResults(true)
      searchResultsWW()
    }
  }, [searchWords])

  useEffect(() => {
    setSearchResults(results)
  }, [results.length])

  return <div className="search-results"></div>
}

export default FilterAndSearchResults
