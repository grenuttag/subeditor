const Caption = ({ id, startInSeconds, endInSeconds, text, updateCaption }) => (
  <div class="caption">
    <span class="timestamps">
      <input type="number" class="startTimestamp" value={startInSeconds} />
      <input type="number" class="endTimeStamp" value={endInSeconds} />
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
