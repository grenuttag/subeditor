export default function CaptionList(props) {
  return (
    <div class="captions">
      {props.captions.map(caption => (
        <div class="caption">{caption.text}</div>
      ))}
    </div>
  )
}
