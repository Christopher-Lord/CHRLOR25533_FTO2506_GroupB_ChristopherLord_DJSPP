import { format } from "date-fns";
import "./PodcastCard.css";
import { Link } from "react-router-dom";

/**
 * React component that creates a single podcast card
 *
 * @param {Object} podcast - podcast object containing all the necessary props
 * @returns {JSX.Element} A styled card displaying the podcast details
 */
export default function PodcastCard({ podcast }) {
  // Destructure podcast props for cleaner access
  const { id, image, title, seasons, genres, updated } = podcast;

  // Format the "updated" date into a readable format
  const formattedDate = format(new Date(updated), "MMM d, yyyy");

  return (
    // Link element to route to specified page when a card is clicked
    <Link to={`/show/${id}`} className="link">
      <div className="podcast-card">
        <img src={image} alt={title} className="preview-cover-img" />

        <h2>{title}</h2>

        <p className="podcast-seasons">{seasons} seasons</p>

        <ul className="podcast-genres">
          {/* Loop through the array of genres and render each one as a list item */}
          {genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>

        <p className="podcast-updated">Updated: {formattedDate}</p>
      </div>
    </Link>
  );
}
