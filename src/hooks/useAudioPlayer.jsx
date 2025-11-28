import { useEffect, useRef, useState } from "react";

export function useAudioPlayer() {
  const audio = useRef(new Audio()).current;

  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  function playEpisode(episode) {
    setTrack(episode);

    audio.src = episode.file;
    audio.play();
    setPlaying(true);
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
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    }

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
    };
  }, [audio]);

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
