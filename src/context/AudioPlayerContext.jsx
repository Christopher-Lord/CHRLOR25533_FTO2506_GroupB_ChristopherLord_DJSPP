// src/context/AudioPlayerContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";

const AudioPlayerContext = createContext();
export const useAudioPlayerContext = () => useContext(AudioPlayerContext);

export function AudioPlayerProvider({ children }) {
  const player = useAudioPlayer();

  return (
    <AudioPlayerContext.Provider value={player}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
