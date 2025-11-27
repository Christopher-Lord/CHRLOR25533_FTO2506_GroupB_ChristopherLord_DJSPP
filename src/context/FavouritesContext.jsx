import { createContext, useContext, useEffect, useState } from "react";

const FavouritesContext = createContext();

export function useFavourites() {
  return useContext(FavouritesContext);
}

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) {
      setFavourites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  function addFavourite(episode) {
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
