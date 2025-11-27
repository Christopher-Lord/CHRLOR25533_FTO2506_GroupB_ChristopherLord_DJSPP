import { useMemo, useState, useEffect } from "react";
import { useFavourites } from "./../context/FavouritesContext";
import { useAudioPlayerContext } from "../context/AudioPlayerContext";
import { fetchSinglePodcast } from "../api/fetchData";
import { useParams } from "react-router-dom";

export default function Favourites() {
  const { favourites, removeFavourite } = useFavourites();

  const { playEpisode } = useAudioPlayerContext();

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
            <div className="fav-header">
              <img src={episodes[0].showImage} alt={showTitle} />
              <h2>{showTitle}</h2>
            </div>
            <div className="episode-list">
              {episodes.map((ep) => (
                <div
                  key={`${ep.showId}-${ep.season}-${ep.episodeNumber}`}
                  className="episode-card"
                >
                  {/* All episodes re-use season cover image */}
                  <img
                    className="episode-img"
                    src={ep.seasonImage}
                    alt={ep.title}
                  />
                  <div className="episode-content">
                    <h4>Season {ep.season}</h4>
                    <h5>
                      Episode {ep.episodeNumber}: {ep.title}
                    </h5>
                    <p>Added {new Date(ep.addedAt).toLocaleString()}</p>
                  </div>
                  <div className="ep-btns">
                    <div
                      className="ep-play-btn"
                      onClick={() =>
                        playEpisode({
                          title: ep.title,
                          episode: ep.episode,
                          file: ep.file,
                          podcastTitle: ep.showTitle,
                          season: ep.season,
                          seasonImage: ep.seasonImage,
                        })
                      }
                    >
                      <span>&#9654;</span>
                    </div>
                    <div className="remove-fav-btn">
                      <span onClick={() => removeFavourite(ep)}>
                        <img
                          className="remove-fav-img"
                          src="./src/assets/remove-fav-btn.png"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
