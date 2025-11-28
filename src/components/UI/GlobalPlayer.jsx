// src/components/UI/GlobalPlayer.jsx
import { useAudioPlayerContext } from "../../context/AudioPlayerContext";
import { timeFormat } from "../../utils/timeFormat";
import "./GlobalPlayer.css";

/**
 * GlobalPlayer Component
 *
 * Displays a global audio player at the bottom of the screen for the currently playing track.
 * Includes track info, play/pause button, and seek bar.
 *
 * Uses AudioPlayerContext to control playback and track progress.
 *
 * @returns {JSX.Element | null} The global audio player UI or null if no track is playing.
 */
export default function GlobalPlayer() {
  // Destructure audio player state and controls from context
  const { track, playing, progress, duration, play, pause, seek } =
    useAudioPlayerContext();

  // Do not render the player if no track is loaded
  if (!track) return null;

  /**
   * Handle seeking through the track when user moves the slider
   * @param event - Slider change event
   */
  function handleSeek(event) {
    // Convert slider value to number
    const value = Number(event.target.value);
    // Update playback position
    seek(value);
  }

  return (
    <div className="player-container">
      {/* LEFT SECTION: Episode / Podcast Info */}
      <div className="player-left">
        <img className="player-img" src={track.seasonImage} alt={track.title} />

        {/* Episode details */}
        <div className="ep-info">
          <strong>{track.podcastTitle}</strong>
          <span>
            Season {track.season} • Episode {track.episode}
          </span>
          <span>{track.title}</span>
        </div>
      </div>

      {/* CENTER SECTION: Playback controls */}
      <div className="player-center">
        {/* Play / Pause button */}
        <div className="player-btn" onClick={playing ? pause : play}>
          {playing ? (
            <span className="pause">&#9208;</span>
          ) : (
            <span className="play">&#9654;</span>
          )}
        </div>

        {/* Seek bar */}
        <div className="seek-wrapper">
          {/* Current time */}
          <span className="time">{timeFormat(progress)}</span>

          {/* Slider for seeking */}
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
          />

          {/* Total duration */}
          <span className="time">{timeFormat(duration)}</span>
        </div>
      </div>
    </div>
  );
}
