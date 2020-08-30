import { useState, useEffect } from "preact/hooks";
import { parse } from "subtitle";

import Player from "./Player";
import CaptionList from "./CaptionList";

export default function App() {
  let [captions, setCaptions] = useState([]);

  function parseCaptions() {
    let parsedCaptions = parse("CHANGEME").map((caption, index) => ({
      id: index,
      ...caption,
      startInSeconds: Number((caption.start * 0.001).toFixed(3)),
      endInSeconds: Number((caption.end * 0.001).toFixed(3)),
    }));
    setCaptions(parsedCaptions);
  }

  useEffect(() => {
    parseCaptions();
  }, []);

  return (
    <div class="app">
      <Player videoID="gM72NGTCIB4" captions={captions} />
      <CaptionList captions={captions} />
    </div>
  );
}
