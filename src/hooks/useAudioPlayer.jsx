import { useEffect, useRef, useState } from "react";
import { useListeningHistory } from "../context/ListeningHistoryContext";

export function useAudioPlayer() {
  const audio = useRef(new Audio()).current;
  const lastUpdate = useRef(0);

  const { updateProgress, getEpisodeProgress } = useListeningHistory();

  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  function playEpisode(episode) {
    setTrack(episode);

    audio.src = episode.file;

    const savedProgress = getEpisodeProgress(
      episode.showId,
      episode.season,
      episode.episode,
    );

    audio.addEventListener(
      "loadedmetadata",
      () => {
        audio.currentTime = savedProgress ? savedProgress.progress : 0;
        audio.play();
        setPlaying(true);
      },
      { once: true },
    );
  }

  function play() {
    audio.play();
    setPlaying(true);
  }

  function pause() {
    audio.pause();
    setPlaying(false);
  }

  function seek(value) {
    audio.currentTime = value;
  }

  useEffect(() => {
    function update() {
      const now = Date.now();
      if (now - lastUpdate.current < 1000) return;
      lastUpdate.current = now;

      setProgress(audio.currentTime);
      setDuration(audio.duration);

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
