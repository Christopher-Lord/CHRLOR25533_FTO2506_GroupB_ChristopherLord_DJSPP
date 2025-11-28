import { useMemo, useState, useEffect } from "react";
import { useFavourites } from "./../context/FavouritesContext";
import { useAudioPlayerContext } from "../context/AudioPlayerContext";
import { useListeningHistory } from "./../context/ListeningHistoryContext";

/**
 * Favourites Component
 *
 * Displays all favourite podcast episodes, grouped by show.
 * Provides sorting options and controls to play episodes or remove them from favourites.
 * Integrates with audio player and listening history context.
 *
 * @returns {JSX.Element} UI for favourites page
 */
export default function Favourites() {
  // Accessing contexts
  const { favourites, removeFavourite } = useFavourites();
  const { playEpisode } = useAudioPlayerContext();
  const { getEpisodeProgress, resetHistory } = useListeningHistory();

  // State to store currently selected sort option
  const [sortOption, setSortOption] = useState("date-newest");

  /**
   * Group favourites by show and sort episodes according to selected sort option
   * Recalculate only when favourites or sortOption change
   */
  const groupedByShow = useMemo(() => {
    const groups = {};

    // Group episodes by show title
    favourites.forEach((ep) => {
      if (!groups[ep.showTitle]) {
        groups[ep.showTitle] = [];
      }
      groups[ep.showTitle].push(ep);
    });

    // Sort episodes within each show group
    Object.keys(groups).forEach((showTitle) => {
      groups[showTitle].sort((a, b) => {
        if (sortOption === "title-asc") return a.title.localeCompare(b.title);
        if (sortOption === "title-desc") return b.title.localeCompare(a.title);
        if (sortOption === "date-newest")
          return new Date(b.addedAt) - new Date(a.addedAt);
        if (sortOption === "date-oldest")
          return new Date(a.addedAt) - new Date(b.addedAt);
        return 0;
      });
    });
    return groups;
  }, [favourites, sortOption]);

  return (
    <div className="favourites-page">
      <div className="fav-page-header">
        <h1>Favourite Episodes</h1>

        <button className="reset-btn" onClick={resetHistory}>
          Reset Progress
        </button>

        <div className="sort-controls">
          <label>Sort by: </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z–A</option>
            <option value="date-newest">Date Added (Newest)</option>
            <option value="date-oldest">Date Added (Oldest)</option>
          </select>
        </div>
      </div>

      {/* Display message if no favourites */}
      {Object.keys(groupedByShow).length === 0 ? (
        <p>No favourites yet!</p>
      ) : (
        Object.entries(groupedByShow).map(([showTitle, episodes]) => (
          <div key={showTitle} className="show-group">
            <div className="fav-header">
              <img src={episodes[0].showImage} alt={showTitle} />
              <h2>{showTitle}</h2>
            </div>

            {/* Episodes list for matching show */}
            <div className="episode-list">
              {episodes.map((ep) => {
                // Get saved progress from listening history
                const progressData = getEpisodeProgress(
                  ep.showId,
                  ep.season,
                  ep.episodeNumber,
                );

                // Determine badge text based on progress
                let badge = null;
                if (progressData && progressData.progress > 0) {
                  badge = progressData.finished
                    ? "Finished"
                    : `Progress: ${Math.floor((progressData.progress / progressData.duration) * 100)}%`;
                }
                return (
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

                    {/* Episode information */}
                    <div className="episode-content">
                      <h4>Season {ep.season}</h4>
                      <h5>
                        Episode {ep.episodeNumber}: {ep.title}
                      </h5>
                      <p>Added {new Date(ep.addedAt).toLocaleString()}</p>
                      {badge && (
                        <div className="ep-progress-badge">{badge}</div>
                      )}
                    </div>

                    {/* Play and remove buttons */}
                    <div className="ep-btns">
                      <div
                        className="ep-play-btn"
                        onClick={() =>
                          playEpisode({
                            showId: ep.showId,
                            title: ep.title,
                            episode: ep.episodeNumber,
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
                            src="/remove-fav-btn.png"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
