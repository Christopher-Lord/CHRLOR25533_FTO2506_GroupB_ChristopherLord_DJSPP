import { useEffect, useRef, useState } from "react";
import { useListeningHistory } from "../context/ListeningHistoryContext";

/**
 * useAudioPlayer custom hook
 *
 * Provides audio playback functionality for a single episode.
 * Tracks current episode, playback state, progress, and duration.
 * Integrates with ListeningHistoryContext to persist playback progress.
 *
 * @returns {Object} Audio player state and control functions:
 * - track: current episode object
 * - playing: boolean indicating if audio is playing
 * - progress: current playback time in seconds
 * - duration: total duration of current episode
 * - playEpisode: function to start playing a new episode
 * - play: function to resume playback
 * - pause: function to pause playback
 * - seek: function to jump to a specific time
 */
export function useAudioPlayer() {
  // Single audio element instance
  const audio = useRef(new Audio()).current;

  // Timestamp of last update to limit updates to ~1s intervals
  const lastUpdate = useRef(0);

  // Access ListeningHistory context to save/retrieve progress
  const { updateProgress, getEpisodeProgress } = useListeningHistory();

  // Currently loaded track and playback state
  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

  // Current playback position and total duration of episode in seconds
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  /**
   * Load and play a new episode.
   * If the episode has saved progress, start playing from there
   *
   * @param {Object} episode - Episode object containing showId, season, episode, file, etc.
   */
  function playEpisode(episode) {
    setTrack(episode);
    audio.src = episode.file;

    // Check if episode has saved progress
    const savedProgress = getEpisodeProgress(
      episode.showId,
      episode.season,
      episode.episode,
    );

    // Play audio once metadata is loaded
    audio.addEventListener(
      "loadedmetadata",
      () => {
        audio.currentTime = savedProgress ? savedProgress.progress : 0;
        audio.play();
        setPlaying(true);
      },
      // Only fire once per track load
      { once: true },
    );
  }

  /**
   * Resume playback
   */
  function play() {
    audio.play();
    setPlaying(true);
  }

  /**
   * Pause playback
   */
  function pause() {
    audio.pause();
    setPlaying(false);
  }

  /**
   * Seek to a specific time in the current track
   * @param {number} value - Time in seconds
   */
  function seek(value) {
    audio.currentTime = value;
  }

  // Update progress and duration state, and save to listening history
  useEffect(() => {
    function update() {
      const now = Date.now();
      // Limit updates to roughly once per second
      if (now - lastUpdate.current < 1000) return;
      lastUpdate.current = now;

      setProgress(audio.currentTime);
      setDuration(audio.duration);

      // Persist progress in listening history
      if (track) {
        updateProgress(
          track.showId,
          track.season,
          track.episode,
          audio.currentTime,
          audio.duration,
        );
      }
    }

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
    };
  }, [audio, track, updateProgress]);

  // Warn user if leaving page while audio is playing
  useEffect(() => {
    function leaveAlert(event) {
      if (!playing) return;
      event.preventDefault();
    }

    window.addEventListener("beforeunload", leaveAlert);

    return () => {
      window.removeEventListener("beforeunload", leaveAlert);
    };
  }, [playing]);

  return {
    track,
    playing,
    progress,
    duration,
    playEpisode,
    play,
    pause,
    seek,
  };
}
