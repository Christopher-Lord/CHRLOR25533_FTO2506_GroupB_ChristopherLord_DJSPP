import { useCallback, useRef, useState } from "react";

export function useAudioPlayer() {
  const audio = useRef(new Audio()).current;

  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

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

  return {
    track,
    playing,
    playEpisode,
    play,
    pause,
    seek,
  };
}
