import Caption from "./Caption"

import "../styles/CaptionList.css"

export default function CaptionList(props) {
  return (
    <div class="captions">
      {props.captions.map(caption => (
        <Caption
          key={caption.id}
          updateCaption={props.updateCaption}
          isActive={props.activeCaption.id === caption.id}
          {...caption}
        />
      ))}
    </div>
  )
}
