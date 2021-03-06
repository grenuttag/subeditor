const { Component } = require("preact")
const YTPlayer = require("yt-player")

export default class YouTubePlayer extends Component {
  static get defaultProps() {
    return {
      videoId: null,
      width: 640,
      height: 360,
      playing: false,
      volume: 100,
      playbackRate: 1,
      onError: () => {},
      onUnplayable: () => {},
      onEnded: () => {},
      onPlaying: () => {},
      onPaused: () => {},
      onBuffering: () => {},
      onDuration: () => {},
      onTimeUpdate: () => {},
    }
  }

  constructor(props) {
    super(props)

    this.player = null
    this.elem = null

    this._waitingForDuration = false

    this._ref = this._ref.bind(this)
    this._onError = this._onError.bind(this)
    this._onUnplayable = this._onUnplayable.bind(this)
    this._onEnded = this._onEnded.bind(this)
    this._onPlaying = this._onPlaying.bind(this)
    this._onPaused = this._onPaused.bind(this)
    this._onBuffering = this._onBuffering.bind(this)
    this._onCued = this._onCued.bind(this)
    this._onTimeUpdate = this._onTimeUpdate.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const props = this.props
    return (
      props.videoId !== nextProps.videoId ||
      props.width !== nextProps.width ||
      props.height !== nextProps.height ||
      props.playing !== nextProps.playing ||
      props.volume !== nextProps.volume ||
      props.playbackRate !== nextProps.playbackRate
    )
  }

  /**
   * Invoke player methods based on incoming props
   */
  componentDidUpdate(prevProps) {
    const { videoId, playing, volume, playbackRate } = this.props

    if (videoId && prevProps.videoId !== videoId) {
      if (!this.player) this._createPlayer(this.props)
      this._waitingForDuration = true
      this.player.load(videoId, playing)
      this.player.setVolume(volume)
      this.player.setPlaybackRate(playbackRate)
    }

    if (videoId && !prevProps.playing && playing) {
      this.player.play()
    }

    if (videoId && prevProps.playing && !playing) {
      this.player.pause()
    }

    if (videoId && prevProps.volume !== volume) {
      this.player.setVolume(volume)
    }

    if (videoId && prevProps.playbackRate !== playbackRate) {
      this.player.setPlaybackRate(playbackRate)
    }

    if (prevProps.videoId && !videoId) {
      this._destroyPlayer()
    }
  }

  componentDidMount() {
    this.componentDidUpdate(YouTubePlayer.defaultProps)
  }

  componentWillUnmount() {
    this._destroyPlayer()
  }

  render(props) {
    const { style, width, height } = props

    return (
      <div style={{ ...style, width, height }} class={props.class}>
        <div ref={this._ref} />
      </div>
    )
  }

  _ref(elem) {
    this.elem = elem
  }

  _createPlayer(props) {
    const { playerOpts } = props
    this.player = new YTPlayer(this.elem, {
      width: "100%",
      height: "100%",
      autoplay: props.playing,
      ...playerOpts,
    })

    this.player.on("error", this._onError)
    this.player.on("unplayable", this._onUnplayable)
    this.player.on("ended", this._onEnded)
    this.player.on("playing", this._onPlaying)
    this.player.on("paused", this._onPaused)
    this.player.on("buffering", this._onBuffering)
    this.player.on("cued", this._onCued)
    this.player.on("timeupdate", this._onTimeUpdate)
  }

  _destroyPlayer() {
    this.player.destroy()
    this.player = null
  }

  _onError(err) {
    this.props.onError(err)
  }

  _onUnplayable() {
    this.props.onUnplayable(this.props.videoId)
  }

  _onEnded() {
    this.props.onEnded()
  }

  _onPlaying() {
    this._onCued()
    this.props.onPlaying()
  }

  _onPaused() {
    this.props.onPaused()
  }

  _onBuffering() {
    this.props.onBuffering()
  }

  _onCued() {
    if (this._waitingForDuration) {
      this._waitingForDuration = false
      const duration = this.player.getDuration()
      this.props.onDuration(duration)
    }
  }

  _onTimeUpdate(time) {
    this.props.onTimeUpdate(time)
  }
}
