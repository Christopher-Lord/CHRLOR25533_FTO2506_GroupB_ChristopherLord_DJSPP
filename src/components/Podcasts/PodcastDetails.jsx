import { useState } from "react";
import { truncateText } from "/src/utils/truncateText.js";
import { Link } from "react-router-dom";
import { useAudioPlayerContext } from "../../context/AudioPlayerContext";
import "/styles.css";


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
export default function PodcastDetails({ podcast }) {
  // Currently selected season number, initialized to the first season in the list
  const [selectedSeason, setSelectedSeason] = useState(
    podcast.seasons[0].season,
  );

  // List of season numbers for dropdown
  const seasonOptions = podcast.seasons.map((s) => s.season);

  // Season object that matched the currently selected season
  const currentSeasonObj = podcast.seasons.find(
    (s) => s.season === selectedSeason,
  );

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
          <img className="cover-img" src={podcast.image} alt={podcast.title} />

          <div className="podcast-header-info">
            <h1 className="title">{podcast.title}</h1>
            <p className="description">{podcast.description}</p>

            {/* List of genre names */}
            <div className="genres">
              {podcast.genres &&
                podcast.genres.map((title, index) => (
                  <span key={index} className="genre-tag">
                    {title}
                  </span>
                ))}
            </div>

            {/* Display last updated date */}
            <p className="updated">
              Last Updated:{" "}
              {new Date(podcast.updated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Podcast stats: number of seasons and total episodes */}
            <div className="stats">
              <p>
                <strong>{podcast.seasons.length}</strong> Seasons
              </p>
              <p>
                <strong>
                  {podcast.seasons.reduce(
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
                        podcastTitle: podcast.title,
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
