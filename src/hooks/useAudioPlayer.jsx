import { useCallback, useEffect, useRef, useState } from "react";

export function useAudioPlayer() {
  const audio = useRef(new Audio()).current;

  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const playEpisode = useCallback(
    (episode) => {
      setTrack(episode);

      audio.src = episode.file;
      audio.play();
      setPlaying(true);
    },
    [audio],
  );

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

    audio.ontimeupdate = update;
    audio.onloadedmetadata = update;

    return () => {
      audio.ontimeupdate = null;
      audio.onloadedmetadata = null;
    };
  }, [audio]);

  useEffect(() => {
    function leaveAlert(event) {
      if (!playing) return;
      event.preventDefault();
      event.returnValue = "";
    }

    window.onbeforeunload = leaveAlert;

    return () => {
      window.onbeforeunload = null;
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
