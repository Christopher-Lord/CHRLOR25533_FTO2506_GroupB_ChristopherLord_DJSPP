// src/components/UI/GlobalPlayer.jsx
import { useAudioPlayerContext } from "../../context/AudioPlayerContext";
import { timeFormat } from "../../utils/timeFormat";
import "./GlobalPlayer.css";

export default function GlobalPlayer() {
  const { track, playing, progress, duration, play, pause, seek } =
    useAudioPlayerContext();

  if (!track) return null;

  function handleSeek(event) {
    const value = Number(event.target.value);
    seek(value);
  }

  return (
    <div className="player-container">
      <div className="player-left">
        <img className="player-img" src={track.seasonImage} alt={track.title} />
        <div className="ep-info">
          <strong>{track.podcastTitle}</strong>
          <span>
            Season {track.season} • Episode {track.episode}
          </span>
          <span>{track.title}</span>
        </div>
      </div>

      <div className="player-center">
        <div className="player-btn" onClick={playing ? pause : play}>
          {playing ? (
            <span className="pause">&#9208;</span>
          ) : (
            <span className="play">&#9654;</span>
          )}
        </div>

        <div className="seek-wrapper">
          <span className="time">{timeFormat(progress)}</span>

          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
          />

          <span className="time">{timeFormat(duration)}</span>
        </div>
      </div>

      <div className="player-right"></div>
    </div>
  );
}
