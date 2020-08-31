import YouTubePlayer from "./YouTubePlayer"

import "../styles/Player.css"

export default function Player(props) {
  return (
    <div class="player">
      <YouTubePlayer
        width="853px"
        height="480px"
        videoId={props.videoID}
        onTimeUpdate={currentTime => props.updateActiveCaption(currentTime)}
      />

      <div class="active-caption">
        <span class="text">
          {props.activeCaption && props.activeCaption.text}
        </span>
      </div>
    </div>
  )
}
