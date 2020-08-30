import { useState, useEffect } from "preact/hooks"
import YTPlayer from "yt-player"

export default function Player(props) {
  let [activeCaption, setActiveCaption] = useState({})
  let player = undefined

  /**
   * Find the caption that needs to be displayed, and then set that
   * as the active caption.
   *
   * @param {number} currentTime Seconds since video started
   */
  function updateActiveCaption(currentTime) {
    let currentCaption = props.captions.filter(
      caption =>
        currentTime > caption.startInSeconds &&
        currentTime < caption.endInSeconds
    )

    // Only update the active caption if there are any
    // matching captions, otherwise this will throw an error.
    if (currentCaption.length !== 0) {
      setActiveCaption(currentCaption[0])
    }
  }

  /**
   * If the video player is playing and the current time has been updated,
   * update the active caption.
   *
   * @todo Figure out if this step is necessary.
   * @param {number} currentTime Seconds since video started
   */
  function timeUpdated(currentTime) {
    if (player.getState() === "playing") {
      updateActiveCaption(currentTime)
    }
  }

  useEffect(() => {
    player = new YTPlayer("#youtube-player")
    player.load(props.videoID)
    player.on("timeupdate", seconds => timeUpdated(seconds))

    return function cleanup() {
      player.destroy()
    }
  }, [props.captions])

  return (
    <div class="player">
      <div id="youtube-player"></div>
      <h4 style={{ marginBottom: "20px" }}>
        {activeCaption && activeCaption.text}
      </h4>
    </div>
  )
}
