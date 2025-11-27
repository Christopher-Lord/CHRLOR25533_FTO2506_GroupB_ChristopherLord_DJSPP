import { useMemo } from "react";
import { useFavourites } from "./../context/FavouritesContext";

export default function Favourites() {
  const { favourites, removeFavourite } = useFavourites();

  const groupedByShow = useMemo(() => {
    const groups = {};

    favourites.forEach((ep) => {
      if (!groups[ep.showTitle]) {
        groups[ep.showTitle] = [];
      }
      groups[ep.showTitle].push(ep);
    });
    return groups;
  }, [favourites]);

  return (
    <div className="favourites-page">
      <h1>Favourite Episodes</h1>

      {Object.keys(groupedByShow).length === 0 ? (
        <p>No favourites yet!</p>
      ) : (
        Object.entries(groupedByShow).map(([showTitle, episodes]) => (
          <div key={showTitle} className="show-group">
            <h2>{showTitle}</h2>
            <div className="episode-list">
              {episodes.map((ep) => (
                <div
                  key={`${ep.showId}-${ep.season}-${ep.episodeNumber}`}
                  className="episode-card"
                >
                  <img
                    src={ep.seasonImage}
                    alt={ep.title}
                    className="episode-img"
                  />
                  <div className="episode-info">
                    <h4>Season {ep.season}</h4>
                    <p>
                      Episode {ep.episodeNumber}: {ep.title}
                    </p>
                    <p>Added {new Date(ep.addedAt).toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeFavourite(ep)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
