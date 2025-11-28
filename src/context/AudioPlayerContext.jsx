// src/context/AudioPlayerContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";

const AudioPlayerContext = createContext();

/**
 * Custom hook to access the AudioPlayerContext.
 * Provides access to player state and control functions.
 *
 * @returns {Object} Audio player state and controls
 */
export const useAudioPlayerContext = () => useContext(AudioPlayerContext);

/**
 * AudioPlayerProvider component
 *
 * Wraps the application to provide audio player state and controls to child components.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - React children that will have access to audio player context
 * @returns {JSX.Element} Context provider with children
 */
export function AudioPlayerProvider({ children }) {
  // Use custom hook to manage audio playback
  const player = useAudioPlayer();

  return (
    <AudioPlayerContext.Provider value={player}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
