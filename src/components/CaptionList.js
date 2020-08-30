const Caption = ({ id, start, end, text, updateCaption }) => (
  <div class="caption">
    <span class="timestamps">
      <span class="start">{start}</span> &mdash;
      <span class="end">{end}</span>
    </span>
    <textarea
      name="editable_text"
      rows="5"
      value={text}
      onInput={event => updateCaption(id, event.target.value)}
    />
  </div>
)

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
