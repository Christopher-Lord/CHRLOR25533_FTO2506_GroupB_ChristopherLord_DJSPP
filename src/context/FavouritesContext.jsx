import { createContext, useContext, useEffect, useState } from "react";

const FavouritesContext = createContext();

/**
 * Custom hook to access the FavouritesContext.
 *
 * @returns {Object} { favourites, addFavourite, removeFavourite }
 */
export function useFavourites() {
  return useContext(FavouritesContext);
}

/**
 * FavouritesProvider component
 *
 * Wraps the application to provide favourites state to child components.
 * Stores favourites in localStorage to persist across sessions.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - React children that will have access to favourites context
 * @returns {JSX.Element} Context provider with children
 */
export function FavouritesProvider({ children }) {
  // State to hold the list of favourite episodes
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) {
      setFavourites(JSON.parse(stored));
    }
  }, []);

  // Save favourites to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  /**
   * Add an episode to favourites if it is not already added
   * @param {Object} episode - Episode object containing showId, season, episodeNumber, title, etc.
   */
  function addFavourite(episode) {
    // Only add if the episode is not already in favourites
    if (
      !favourites.some(
        (fav) =>
          fav.showId === episode.showId &&
          fav.season === episode.season &&
          fav.episodeNumber === episode.episodeNumber,
      )
    ) {
      setFavourites([
        ...favourites,
        { ...episode, addedAt: new Date().toISOString() },
      ]);
    }
  }

  /**
   * Remove an episode from favourites
   * @param {Object} episode - Episode object to remove
   */
  function removeFavourite(episode) {
    setFavourites(
      favourites.filter(
        (fav) =>
          !(
            fav.showId === episode.showId &&
            fav.season === episode.season &&
            fav.episodeNumber === episode.episodeNumber
          ),
      ),
    );
  }

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
