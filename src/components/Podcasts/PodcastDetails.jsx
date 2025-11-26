import { useState } from "react";
import { truncateText } from "/src/utils/truncateText.js";
import { Link } from "react-router-dom";
import { useAudioPlayerContext } from "../../context/AudioPlayerContext";
import "/styles.css";
import { usePodcasts } from './../../context/PodcastContext';


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

  // List of season numbers for dropdown
  const seasonOptions = singlePodcast.seasons.map((s) => s.season);

  // Season object that matched the currently selected season
  const currentSeasonObj = singlePodcast.seasons.find(
    (s) => s.season === selectedSeason,
  );

  const { podcasts } = usePodcasts();
  const correctPodcast = podcasts.find((pod) => pod.id === singlePodcast.id);

  const { playEpisode } = useAudioPlayerContext();

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
              {
                correctPodcast.genres.map((genre) => (
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
            {currentSeasonObj.episodes.map((ep) => (
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
                </div>
                <div className="ep-btns">
                  <div
                    className="ep-play-btn"
                    onClick={() =>
                      playEpisode({
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
                  <div className="ep-fav-btn">
                    <span>&#x2764;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
