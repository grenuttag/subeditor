import { useState, useEffect } from "preact/hooks";
import YTPlayer from "yt-player";

export default function Player(props) {
  let [activeCaption, setActiveCaption] = useState({});
  let [player, setPlayer] = useState(undefined);

  function updateActiveCaption(currentTime) {
    let currentCaption = props.captions.filter(
      (caption) =>
        currentTime > caption.startInSeconds &&
        currentTime < caption.endInSeconds
    );

    if (currentCaption.length !== 0) {
      setActiveCaption(currentCaption[0]);
    }
  }

  function timeUpdated(currentTime) {
    if (player.getState() === "playing") {
      updateActiveCaption(currentTime);
    }
  }

  useEffect(() => {
    player = new YTPlayer("#youtube-player");
    player.load(props.videoID);
    player.on("timeupdate", (seconds) => timeUpdated(seconds));

    setPlayer(player);

    return function cleanup() {
      player.destroy();
    };
  }, [props.captions]);

  return (
    <div class="player">
      <div id="youtube-player"></div>
      <h4 style={{ marginBottom: "20px" }}>
        {activeCaption && activeCaption.text}
      </h4>
    </div>
  );
}
