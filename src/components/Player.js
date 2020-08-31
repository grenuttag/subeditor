import YouTubePlayer from "./YouTubePlayer"

export default function Player(props) {
  return (
    <div class="player">
      <YouTubePlayer
        videoId={props.videoID}
        onTimeUpdate={currentTime => props.updateActiveCaption(currentTime)}
      />

      <h4 style={{ marginBottom: "20px" }}>
        {props.activeCaption && props.activeCaption.text}
      </h4>
    </div>
  )
}
