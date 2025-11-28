import { createContext, useContext, useEffect, useState } from "react";

const ListeningHistoryContext = createContext();

/**
 * Custom hook to access the ListeningHistoryContext.
 *
 * @returns {Object} { history, updateProgress, getEpisodeProgress, resetHistory }
 */
export function useListeningHistory() {
  return useContext(ListeningHistoryContext);
}

/**
 * ListeningHistoryProvider component
 *
 * Wraps the app to provide listening history state and functions to children.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Children components with access to listening history context
 * @returns {JSX.Element} Context provider with children
 */
export function ListeningHistoryProvider({ children }) {
  // Initialize history from localStorage or start as an empty object
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("listeningHistory")) || {};
  });

  // Persist listening history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("listeningHistory", JSON.stringify(history));
  }, [history]);

  /**
   * Update the progress of a specific episode
   * @param {string} showId - ID of the podcast show
   * @param {number} season - Season number
   * @param {number} episode - Episode number
   * @param {number} progress - Current playback time in seconds
   * @param {number} duration - Total duration of the episode in seconds
   */
  function updateProgress(showId, season, episode, progress, duration) {
    setHistory((prev) => {
      // Create a deep copy to avoid mutating previous state
      const updated = structuredClone(prev);

      // Ensure nested objects exist
      if (!updated[showId]) updated[showId] = {};
      if (!updated[showId][season]) updated[showId][season] = {};

      // Save progress, duration, and finished status
      updated[showId][season][episode] = {
        progress,
        duration,
        // Mark as finished if near the end
        finished: progress >= duration - 1,
      };

      return updated;
    });
  }

  /**
   * Get the progress of a specific episode
   * @param {string} showId - ID of the podcast show
   * @param {number} season - Season number
   * @param {number} episode - Episode number
   * @returns {Object|null} Progress object { progress, duration, finished } or null if not found
   */
  function getEpisodeProgress(showId, season, episode) {
    return history[showId]?.[season]?.[episode] || null;
  }

  /**
   * Reset the entire listening history
   */
  function resetHistory() {
    setHistory({});
  }

  return (
    <ListeningHistoryContext.Provider
      value={{ history, updateProgress, getEpisodeProgress, resetHistory }}
    >
      {children}
    </ListeningHistoryContext.Provider>
  );
}
