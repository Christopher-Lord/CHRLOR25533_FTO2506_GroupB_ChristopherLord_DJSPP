import { createContext, useContext, useEffect, useState } from "react";

const ListeningHistoryContext = createContext();

export function useListeningHistory() {
  return useContext(ListeningHistoryContext);
}

export function ListeningHistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("listeningHistory")) || {};
  });

  useEffect(() => {
    localStorage.setItem("listeningHistory", JSON.stringify(history));
  }, [history]);

  function updateProgress(showId, season, episode, progress, duration) {
    setHistory((prev) => {
      const updated = structuredClone(prev);

      if (!updated[showId]) updated[showId] = {};
      if (!updated[showId][season]) updated[showId][season] = {};

      updated[showId][season][episode] = {
        progress,
        duration,
        finished: progress >= duration - 1,
      };

      return updated;
    });
  }

  function getEpisodeProgress(showId, season, episode) {
    return history[showId]?.[season]?.[episode] || null;
  }

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
