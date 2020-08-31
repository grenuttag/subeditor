import "../styles/Caption.css"

const Caption = ({
  id,
  startInSeconds,
  endInSeconds,
  text,
  updateCaption,
  isActive,
}) => (
  <div class={`caption ${isActive ? "caption-highlighted" : ""}`}>
    <div class="timestamps">
      <input type="text" class="startTimestamp" value={startInSeconds} />
      <input type="text" class="endTimeStamp" value={endInSeconds} />
    </div>

    <textarea
      class="caption-textbox"
      name="editable_text"
      value={text}
      rows="3"
      onInput={event => updateCaption(id, event.target.value)}
    />
  </div>
)

export default Caption
