import { useState } from "react";
import { truncateText } from "/src/utils/truncateText.js";
import { Link } from "react-router-dom";
import { useAudioPlayerContext } from "../../context/AudioPlayerContext";
import "/styles.css";
import { usePodcasts } from "./../../context/PodcastContext";
import { useFavourites } from "../../context/FavouritesContext";
import { useListeningHistory } from "../../context/ListeningHistoryContext";

/**
 * PodcastDetails Component
 *
 * Displays detailed information about a podcast
 *
 * @param {Object} podcast - props.podcast: Podcast data object
 *  - podcast.title - Podcast title
 *  - podcast.description - Podcast description
 *  - podcast.updated - Date string of last update
 *  - podcast.image - URL of podcast cover image
 *  - podcast.genres - List of genre names
 *  - podcast.seasons - Array of season objects
 *
 * @returns {JSX.Element} Podcast details UI
 */
export default function PodcastDetails({ singlePodcast }) {
  // Currently selected season number, initialized to the first season in the list
  const [selectedSeason, setSelectedSeason] = useState(
    singlePodcast.seasons[0].season,
  );

  const { getEpisodeProgress } = useListeningHistory();

  // List of season numbers for dropdown
  const seasonOptions = singlePodcast.seasons.map((s) => s.season);

  // Season object that matched the currently selected season
  const currentSeasonObj = singlePodcast.seasons.find(
    (s) => s.season === selectedSeason,
  );

  // Get the full podcast data from context
  const { podcasts } = usePodcasts();
  const correctPodcast = podcasts.find((pod) => pod.id === singlePodcast.id);

  // Audio player context for playing episode
  const { playEpisode } = useAudioPlayerContext();

  // Favourites context for managing favourite episodes
  const { favourites, addFavourite, removeFavourite } = useFavourites();

  /**
   * Checks if a given episode is in the favourites list
   * @param {Object} ep - Episode object
   * @returns {boolean} True if episode is favourited, false otherwise
   */
  function isFavourite(ep) {
    return favourites.some(
      (fav) =>
        fav.showId === singlePodcast.id &&
        fav.season === currentSeasonObj.season &&
        fav.episodeNumber === ep.episode,
    );
  }

  return (
    <div className="podcast-modal-container" id="podcast-modal">
      <div className="modal-content">
        {/* Back button to return to home page */}
        <Link to={"/"} className="link">
          <div className="back-btn">
            <p>&larr; Back to Home</p>
          </div>
        </Link>

        {/* HEADER */}
        <div className="header">
          <img
            className="cover-img"
            src={singlePodcast.image}
            alt={singlePodcast.title}
          />

          <div className="podcast-header-info">
            <h1 className="title">{singlePodcast.title}</h1>
            <p className="description">{singlePodcast.description}</p>

            {/* List of genre names */}
            <div className="genres">
              {correctPodcast.genres.map((genre) => (
                <span key={genre} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>

            {/* Display last updated date */}
            <p className="updated">
              Last Updated:{" "}
              {new Date(singlePodcast.updated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Podcast stats: number of seasons and total episodes */}
            <div className="stats">
              <p>
                <strong>{singlePodcast.seasons.length}</strong> Seasons
              </p>
              <p>
                <strong>
                  {singlePodcast.seasons.reduce(
                    (sum, s) => sum + s.episodes.length,
                    0,
                  )}
                </strong>{" "}
                Episodes
              </p>
            </div>
          </div>
        </div>

        {/* SEASON SELECTOR */}
        <div className="season-selector">
          <h3>Current Season</h3>

          {/* Dropdown to select a season */}
          <select
            className="season-dropdown"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
          >
            {seasonOptions.map((season) => (
              <option key={season} value={season}>
                Season {season}
              </option>
            ))}
          </select>
        </div>

        {/* SEASON DETAILS */}
        <div className="season-card-container">
          {/* Display season card if a valid season is selected */}
          {currentSeasonObj && (
            <div className="season-card">
              <div className="season-cover">
                <img
                  src={currentSeasonObj.image}
                  alt={currentSeasonObj.title}
                />
              </div>
              <div className="season-info">
                <h2>
                  Season {currentSeasonObj.season}: {currentSeasonObj.title}
                </h2>
                <p>{currentSeasonObj.episodes.length} Episodes</p>
              </div>
            </div>
          )}

          {/* EPISODES LIST */}
          <div className="episodes-list">
            {currentSeasonObj.episodes.map((ep) => {
              // Get episode progress from listening history
              const progressData = getEpisodeProgress(
                singlePodcast.id,
                currentSeasonObj.season,
                ep.episode,
              );

              // Determine badge text based on progress
              let badge = null;
              if (progressData) {
                badge = progressData.finished
                  ? "Finished"
                  : `Progress: ${Math.floor((progressData.progress / progressData.duration) * 100)}%`;
              }

              return (
                <div key={ep.episode} className="episode-card">
                  {/* All episodes re-use season cover image */}
                  <img
                    className="episode-img"
                    src={currentSeasonObj.image}
                    alt={ep.title}
                  />
                  <div className="episode-content">
                    <h4>
                      Episode {ep.episode}: {ep.title}
                    </h4>

                    {/* Truncated episode description */}
                    <p className="ep-description">
                      {truncateText(ep.description, 159)}
                    </p>

                    {/* Progress badge if episode has been started */}
                    {badge && <div className="ep-progress-badge">{badge}</div>}
                  </div>
                  <div className="ep-btns">
                    {/* Play button */}
                    <div
                      className="ep-play-btn"
                      onClick={() =>
                        playEpisode({
                          showId: singlePodcast.id,
                          title: ep.title,
                          episode: ep.episode,
                          file: ep.file,
                          podcastTitle: singlePodcast.title,
                          season: currentSeasonObj.season,
                          seasonImage: currentSeasonObj.image,
                        })
                      }
                    >
                      <span>&#9654;</span>
                    </div>
                    {/* Favourite button */}
                    <div
                      className="ep-fav-btn"
                      onClick={() => {
                        const episodeObj = {
                          showId: singlePodcast.id,
                          showTitle: singlePodcast.title,
                          showImage: singlePodcast.image,
                          season: currentSeasonObj.season,
                          seasonTitle: currentSeasonObj.title,
                          seasonImage: currentSeasonObj.image,
                          episodeNumber: ep.episode,
                          title: ep.title,
                          description: ep.description,
                          file: ep.file,
                        };

                        // Toggle favourite status
                        if (isFavourite(ep)) {
                          removeFavourite(episodeObj);
                        } else {
                          addFavourite(episodeObj);
                        }
                      }}
                    >
                      {/* Heart icon color changes if favourited */}
                      <span
                        style={{ color: isFavourite(ep) ? "#c24242" : "gray" }}
                      >
                        &#x2764;
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
