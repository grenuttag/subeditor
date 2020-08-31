const Caption = ({ id, startInSeconds, endInSeconds, text, updateCaption }) => (
  <div class="caption">
    <span class="timestamps">
      <div class="start">{startInSeconds}</div>
      <div class="end">{endInSeconds}</div>
    </span>

    <textarea
      name="editable_text"
      rows="5"
      value={text}
      onInput={event => updateCaption(id, event.target.value)}
    />
  </div>
)

export default Caption
