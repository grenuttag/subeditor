import { useEffect } from "preact/hooks"
import YTPlayer from "yt-player"

export default function Player(props) {
  let player = undefined

  /**
   * If the video player is playing and the current time has been updated,
   * update the active caption.
   *
   * @todo Figure out if this step is necessary.
   * @param {number} currentTime Seconds since video started
   */
  function timeUpdated(currentTime) {
    if (player.getState() === "playing") {
      props.updateActiveCaption(currentTime)
    }
  }

  useEffect(() => {
    player = new YTPlayer("#youtube-player")
    player.load(props.videoID)
    player.on("timeupdate", currentTime => timeUpdated(currentTime))

    console.log(props)

    return function cleanup() {
      player.destroy()
    }
  }, [props.captions])

  return (
    <div class="player">
      <div id="youtube-player"></div>
      <h4 style={{ marginBottom: "20px" }}>
        {props.activeCaption && props.activeCaption.text}
      </h4>
    </div>
  )
}
