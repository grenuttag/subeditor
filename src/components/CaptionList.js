import Caption from "./Caption"

export default function CaptionList(props) {
  return (
    <div class="captions">
      {props.captions.map(caption => (
        <Caption
          key={caption.id}
          updateCaption={props.updateCaption}
          {...caption}
        />
      ))}
    </div>
  )
}
