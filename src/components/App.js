import { useState, useEffect } from "preact/hooks"
import { parse } from "subtitle"

import Player from "./Player"
import CaptionList from "./CaptionList"

export default function App() {
  let [captions, setCaptions] = useState([])

  /**
   * Parse an SRT caption file into a JSON object, adding some
   * useful extra properties so that it works better with the
   * YouTube player, and then set the `captions` state to
   * the returned object.
   *
   * @param {string} captions
   */
  function parseCaptions(captions) {
    let parsedCaptions = parse(captions).map((caption, index) => ({
      id: index,
      ...caption,
      startInSeconds: Number((caption.start * 0.001).toFixed(3)),
      endInSeconds: Number((caption.end * 0.001).toFixed(3)),
    }))

    setCaptions(parsedCaptions)
  }

  /**
   * Fetch an arbitrary URL and attempt to parse it, if there's
   * any error, log it to the console.
   *
   * @todo Better error handling if this step fails
   * @todo Allow users to import SRT files from their desktop
   *
   * @param {string} url
   */
  async function fetchCaptions(url) {
    try {
      const response = await fetch(url, { method: "GET" })
      const text = await response.text()

      parseCaptions(text)
    } catch (error) {
      return console.error("Error fetching captions:", error)
    }
  }

  useEffect(() => {
    fetchCaptions("/assets/subtitles/test.txt")
  }, [])

  return (
    <div class="app">
      <Player videoID="gM72NGTCIB4" captions={captions} />
      <CaptionList captions={captions} />
    </div>
  )
}
